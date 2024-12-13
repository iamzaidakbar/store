import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { CartItem } from '@/store/useCartStore'

export async function POST(request: Request) {
  try {
    const { items, userId, stripeSessionId } = await request.json()

    const order = await prisma.order.create({
      data: {
        userId,
        stripeSessionId,
        status: 'PENDING',
        items: {
          create: items.map((item: CartItem) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Order creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    const orders = await prisma.order.findMany({
      where: { userId: userId! },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 