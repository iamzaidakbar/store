import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const isAuthPage = ['/login', '/register'].includes(request.nextUrl.pathname)
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  // If trying to access auth pages while logged in
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If trying to access admin routes without being logged in
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/admin/:path*'
  ]
} 
