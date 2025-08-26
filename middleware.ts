import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  const session = getSessionCookie(request);

  console.log({session});
  
  // Only protect dashboard routes
  if (url.pathname.startsWith('/dashboard')) {
    // Check for auth cookie (simplified check for edge runtime)
    
    // If no auth token, redirect to sign-in
    if (!session) {
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