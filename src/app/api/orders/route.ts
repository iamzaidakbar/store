import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateUser } from '@/middleware/auth'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia'
})

export async function GET(request: Request) {
  const auth = await authenticateUser(request)
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: auth.user.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await authenticateUser(request)
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: auth.user.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
            images: item.product.images
          },
          unit_amount: Math.round(Number(item.product.price) * 100)
        },
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`
    })

    // Create order
    const order = await prisma.order.create({
      data: {
        userId: auth.user.id,
        stripeSessionId: session.id,
        status: 'PENDING',
        items: {
          create: cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }))
        }
      }
    })

    // Clear cart
    await prisma.cart.delete({
      where: { id: cart.id }
    })

    return NextResponse.json({ sessionId: session.id, orderId: order.id })
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
} 