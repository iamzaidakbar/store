import { verify } from 'jsonwebtoken'
import { prisma } from '@/lib/prisma'

export async function authenticateUser(request: Request) {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1]
    if (!token) {
      return { error: 'No token provided' }
    }

    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    })

    if (!user) {
      return { error: 'User not found' }
    }

    return { user }
  } catch (error) {
    console.error('Authentication error:', error)
    return { error: 'Invalid token' }
  }
} 