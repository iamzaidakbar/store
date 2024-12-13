import jwt from 'jsonwebtoken'

export async function verifyJwtToken(token: string) {
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!)
    return verified as jwt.JwtPayload
  } catch (error) {
    console.error('Error verifying JWT token:', error)
    throw new Error('Invalid token')
  }
} 