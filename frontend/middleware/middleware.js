import { NextResponse } from 'next/server';

export const config = {
  
  matcher: ['/:path*']
};

export default async function middleware(req) {
  const cookieHeader = req.headers.get('cookie') || '';
  const backend = 'http://localhost:3001';
    const path = req.nextUrl.pathname;

  if (
    path === '/'          
  ) {
    return NextResponse.next();
  }
  try {
    const res = await fetch(`${backend}/api/auth/check`, {
      method: 'GET',
      headers: {
        cookie: cookieHeader
      }
    });

    if (res.ok) return NextResponse.next();
  } catch (err) {
    console.error('middleware auth check error:', err);
  }


// Not authenticated -> redirect to login
  return NextResponse.redirect(new URL('/', req.url));
}
