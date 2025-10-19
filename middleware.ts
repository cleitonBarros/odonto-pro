import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "./src/hooks/get-auth-session";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const session = await getAuthSession()
    if (!session) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Executa o middleware apenas nas rotas que começam com /dashboard
    '/dashboard/:path*'
  ]
}