import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Paths that require authentication
  const protectedPaths = ['/admin', '/api/admin']
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (!isProtectedPath) return NextResponse.next()

  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user', JSON.stringify(decoded))

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
} 