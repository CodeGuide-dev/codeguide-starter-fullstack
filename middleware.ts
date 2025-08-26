import { NextRequest, NextResponse } from 'next/server';
import { auth } from './lib/auth';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  
  // Only protect dashboard routes
  if (url.pathname.startsWith('/dashboard')) {
    try {
      const session = await auth.api.getSession({
        headers: request.headers
      });

      // If no session, redirect to sign-in
      if (!session?.user) {
        const signInUrl = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('redirect', url.pathname);
        return NextResponse.redirect(signInUrl);
      }

      // User is authenticated, allow access
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware authentication error:', error);
      // On error, redirect to sign-in for safety
      const signInUrl = new URL('/sign-in', request.url);
      signInUrl.searchParams.set('redirect', url.pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  // For all other routes, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};