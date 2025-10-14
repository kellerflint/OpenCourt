import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/new',
    '/home',
    '/new/:path*',
    '/home/:path*'
  ]
};

export default async function middleware(req) {
  const cookieHeader = req.headers.get('cookie') || '';
  const backend = 'http://localhost:3001';
  const path = req.nextUrl.pathname;

  console.log(' Middleware Triggered');
  console.log('Protected route accessed:', path);
  console.log('Cookies present:', cookieHeader);

  try {
    const res = await fetch(`${backend}/api/auth/check`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        cookie: cookieHeader
      }
    });

    const data = await res.json();
    console.log('Auth check response:', data);

    if (!data.authenticated) {
      console.log(' Not authenticated, redirecting to home');
      return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error(' Auth check failed:', err);
    return NextResponse.redirect(new URL('/', req.url));
  }
}