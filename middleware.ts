import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  
  const hostname = request.headers.get("host") || "";
  const isAxisSubdomain = hostname.startsWith("axis.");

  // 1. SAFETY ZONE (Preserved)
  if (
    path.startsWith("/api/auth") || // Allow auth endpoints
    path.startsWith("/_next") || 
    path.startsWith("/static") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. NEW: SOVEREIGN GLOBAL ADMIN PROTECTION (Added)
  // This protects the new Provisioning and Analytics routes
  if (path.startsWith("/admin") || path.startsWith("/api/admin")) {
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
    return NextResponse.next();
  }

  // 3. SESSION ANALYSIS (Existing axis_session logic preserved)
  const sessionCookie = request.cookies.get("axis_session");
  const sessionValue = sessionCookie?.value;
  const hasSession = !!sessionValue;
  const isAdminLegacy = sessionValue === "admin_master";

  // 4. ADMIN PROTECTION (Existing axis/admin logic preserved)
  if (path.startsWith("/axis/admin") && !isAdminLegacy) {
    return NextResponse.redirect(new URL("/axis/login", request.url));
  }

  // 5. SUBDOMAIN ROUTING & PORTAL PROTECTION (Preserved)
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

  // 6. LEGACY/DIRECT ACCESS GATEKEEPER (Preserved)
  const isPortalRoute = path.startsWith("/axis/portal");
  if (isPortalRoute && !hasSession) {
    return NextResponse.redirect(new URL("/axis/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
