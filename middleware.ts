import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const secret = process.env.NEXTAUTH_SECRET;

  // 🚨 THE FIX: DUAL-CHECK STRATEGY
  // 1. Try to find the token assuming a Secure connection (Production)
  // 2. If missing, try assuming an Insecure connection (Cloud Run Internal / Dev)
  // This ensures we find the cookie regardless of SSL termination.
  const token = 
    (await getToken({ req: request, secret, secureCookie: true })) || 
    (await getToken({ req: request, secret, secureCookie: false }));

  const { pathname } = request.nextUrl;

  // 1. PUBLIC ROUTES (Allow everyone)
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/axis/login") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. PROTECTED ROUTES
  const isAuthPath = pathname.startsWith("/axis/portal") || 
                     pathname.startsWith("/axis/admin") ||
                     pathname.startsWith("/admin");

  if (isAuthPath && !token) {
    const loginUrl = new URL("/axis/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. ADMIN ROLE CHECK
  if ((pathname.startsWith("/admin") || pathname.startsWith("/axis/admin")) && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/axis/portal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/axis/:path*", 
    "/admin/:path*",
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)"
  ],
};
