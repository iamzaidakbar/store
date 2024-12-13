import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateUser } from '@/middleware/auth'
import { z } from 'zod'

const cartItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1)
})

export async function GET(request: Request) {
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

    return NextResponse.json(cart)
  } catch (error) {
    console.error('Cart fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const auth = await authenticateUser(request)
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { productId, quantity } = cartItemSchema.parse(body)

    let cart = await prisma.cart.findUnique({
      where: { userId: auth.user.id },
      include: { items: true }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: auth.user.id,
          items: {
            create: {
              productId,
              quantity
            }
          }
        },
        include: { items: true }
      })
    } else {
      const existingItem = cart.items.find(item => item.productId === productId)

      if (existingItem) {
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: existingItem.quantity + quantity }
        })
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity
          }
        })
      }
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.error('Cart update error:', error)
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 })
  }
} 