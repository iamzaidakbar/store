import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { verifyJwtToken } from '@/lib/jwt'

export async function POST(request: Request) {
  try {
    // Get token from cookies using next/headers
    const token = (await cookies()).get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify token and check if user is admin
    const payload = await verifyJwtToken(token)
    const admin = await prisma.user.findUnique({
      where: { id: payload.userId }
    })

    if (!admin || admin.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Get email from request body
    const { email } = await request.json()

    // Update user role to ADMIN
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' },
    })

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Promote admin error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 