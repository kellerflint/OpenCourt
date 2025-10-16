import { NextResponse } from 'next/server';

// This tells Next.js which routes to protect
// Matches all routes EXCEPT:
// - / (homepage)
// - /api (backend stuff)
// - /_next (Next.js files)
// - images and other static files
export const config = {
  matcher: [
    '/((?!$|api|_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|manifest.json|fonts|images|assets|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map|txt|woff2?)$).*)'
  ]
};
// This function runs before letting users access protected pages
export default async function middleware(req) {
  // Get the cookies (we need these to check if user is logged in)
  const cookieHeader = req.headers.get('cookie') || '';
  
  // Our backend server url
  const backend = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
  
  // Get the page the user is trying to visit
  const path = req.nextUrl.pathname;

  // Log stuff to help us debug
  console.log('Checking auth for:', path);
  console.log('Cookies we found:', cookieHeader);

  try {
    // Ask backend if user is logged in
    const res = await fetch(`${backend}/api/auth/check`, {
      method: 'GET',
      credentials: 'include',  // Make sure to send cookies
      headers: {
        cookie: cookieHeader   // Pass the cookies to backend
      }
    });

    // Get the response from backend
    const data = await res.json();
    console.log('Backend says:', data);

    // If user isn't logged in, send them to homepage
    if (!data.authenticated) {
      console.log('Not logged in - sending to homepage');
      return NextResponse.redirect(new URL('/', req.url));
    }

    // If we get here, user is logged in - let them through
    console.log('User is logged in - allowing access');
    return NextResponse.next();
  } catch (err) {
    // If something breaks, play it safe and send to homepage
    console.log('Something went wrong:', err);
    return NextResponse.redirect(new URL('/', req.url));
  }
}