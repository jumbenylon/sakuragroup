import { NextResponse } from "next-auth/middleware"; // Use the built-in NextAuth helper
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  const { pathname } = request.nextUrl;

  // 1. PUBLIC ROUTES (Allow these always)
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/axis/login") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/_next") ||
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

  // 3. ADMIN ROLE CHECK
  if ((pathname.startsWith("/admin") || pathname.startsWith("/axis/admin")) && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/axis/portal", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/axis/:path*", "/admin/:path*"],
};
