import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Routes that require authentication
  const protectedRoutes = [
    '/dashboard',
    '/posts/new',
    '/posts/edit',
    '/profile',
    '/users'
  ];

  // Routes that require specific roles
  const adminRoutes = ['/dashboard/admin', '/users'];
  const authorRoutes = ['/posts/new', '/posts/edit'];

  // Check if user is trying to access protected routes
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some(route => pathname.startsWith(route));
  const isAuthorRoute = authorRoutes.some(route => pathname.startsWith(route));

  // If not authenticated and trying to access protected route
  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // If authenticated but trying to access admin routes without admin role
  if (token && isAdminRoute && token.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If authenticated but trying to access author routes without author/admin role
  if (token && isAuthorRoute && !['AUTHOR', 'ADMIN'].includes(token.role as string)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/posts/new',
    '/posts/edit/:path*',
    '/profile/:path*',
    '/users/:path*'
  ],
}; 