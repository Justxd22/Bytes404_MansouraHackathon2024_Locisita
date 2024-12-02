import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // List of paths to exclude from authentication
  return NextResponse.next();

  const { pathname } = req.nextUrl;
  const freeRoutes = ['/api/products',' /api/login', '/api/register', '/api/status', '/api/session', '/login', '/register', '/', '/401'];

  if (pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/public/') ||
    pathname.startsWith('/assets/') ||
    freeRoutes.includes(pathname)) {
    return NextResponse.next();
  }


  const res = await fetch(`${req.nextUrl.origin}/api/session`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'cookie': req.headers.get('cookie') || '',
    },
    credentials: 'include',
  });
  let code = await res.json();
  code = code.code;


  if (code) {
    const errorMessage = code === 1 ? 'Unauthorized: No session cookie found' : 'Unauthorized: session expired';
    return NextResponse.redirect(new URL('/401', req.url));
    return NextResponse.json({ err: errorMessage }, { status: 401 });
  }

  return NextResponse.next();
}
