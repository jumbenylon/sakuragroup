import { NextResponse } from "next/server"; // Corrected: Always from next/server
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  const { pathname } = request.nextUrl;

  // 1. PUBLIC ROUTES & ASSETS
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

  // 2. PROTECTED ROUTES (Require Token)
  const isAuthPath = pathname.startsWith("/axis/portal") || 
                     pathname.startsWith("/axis/admin") ||
                     pathname.startsWith("/admin");

  if (isAuthPath && !token) {
    const loginUrl = new URL("/axis/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. ADMIN ROLE PROTECTION
  if ((pathname.startsWith("/admin") || pathname.startsWith("/axis/admin")) && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/axis/portal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Use a cleaner matcher to avoid middleware running on every single image/favicon request
  matcher: [
    "/axis/:path*", 
    "/admin/:path*",
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)"
  ],
};
