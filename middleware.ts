import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// We use a dynamic approach to avoid build-time resolution errors in strict environments
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  
  const hostname = request.headers.get("host") || "";
  const isAxisSubdomain = hostname.startsWith("axis.");

  // 1. SAFETY ZONE
  if (
    path.startsWith("/api/auth") || 
    path.startsWith("/_next") || 
    path.startsWith("/static") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. SOVEREIGN ADMIN GATE (New Admin UI & API)
  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
    try {
      const token = await getToken({ 
        req: request, 
        secret: process.env.NEXTAUTH_SECRET 
      });

      const isMasterAdmin = 
        token?.role === "ADMIN" && 
        token?.email === "admin@sakuragroup.co.tz";

      if (!isMasterAdmin) {
        return NextResponse.redirect(new URL("/axis/login", request.url));
      }
    } catch (error) {
      // In case of JWT failure during build or runtime
      return NextResponse.redirect(new URL("/axis/login", request.url));
    }
  }

  // 3. SESSION ANALYSIS (Legacy Logic Preserved)
  const sessionCookie = request.cookies.get("axis_session");
  const sessionValue = sessionCookie?.value;
  const hasSession = !!sessionValue;
  const isAdminLegacy = sessionValue === "admin_master";

  // 4. ADMIN PROTECTION (Legacy /axis/admin paths)
  if (path.startsWith("/axis/admin") && !isAdminLegacy) {
    return NextResponse.redirect(new URL("/axis/login", request.url));
  }

  // 5. SUBDOMAIN ROUTING & PORTAL PROTECTION
  if (isAxisSubdomain) {
    if (path === "/" && !hasSession) {
      return NextResponse.redirect(new URL("/axis/login", request.url));
    }
    
    if (path === "/" && hasSession) {
      return NextResponse.rewrite(new URL("/axis/portal", request.url));
    }

    if (path === "/login") {
      return NextResponse.rewrite(new URL("/axis/login", request.url));
    }
  }

  // 6. PORTAL ACCESS GATEKEEPER
  if (path.startsWith("/axis/portal") && !hasSession) {
    return NextResponse.redirect(new URL("/axis/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
