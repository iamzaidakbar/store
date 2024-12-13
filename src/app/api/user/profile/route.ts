import { NextResponse } from 'next/server'
import { authenticateUser } from '@/middleware/auth'

export async function GET(request: Request) {
  const auth = await authenticateUser(request)
  if (auth.error || !auth.user) {
    return NextResponse.json({ error: auth.error || 'User not found' }, { status: 401 })
  }

  const { password: _, ...userWithoutPassword } = auth.user
  return NextResponse.json(userWithoutPassword)
} 