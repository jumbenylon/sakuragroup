import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  
  const hostname = request.headers.get("host") || "";
  const isAxisSubdomain = hostname.startsWith("axis.");

  // 1. SAFETY ZONE (Preserved & Updated)
  // We added /api/auth to ensure login works without loops
  if (
    path.startsWith("/api/auth") || 
    path.startsWith("/_next") || 
    path.startsWith("/static") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. SOVEREIGN ADMIN GATE (New Addition)
  // Protects /admin and /api/admin for the new Provisioning system
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
    // If validated, proceed to API/UI
    return NextResponse.next();
  }

  // 3. SESSION ANALYSIS (Legacy Logic Preserved)
  const sessionCookie = request.cookies.get("axis_session");
  const sessionValue = sessionCookie?.value;
  const hasSession = !!sessionValue;
  const isAdmin = sessionValue === "admin_master";

  // 4. ADMIN PROTECTION (Legacy Logic Preserved)
  if (path.startsWith("/axis/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/axis/login", request.url));
  }

  // 5. SUBDOMAIN ROUTING & PORTAL PROTECTION (Legacy Logic Preserved)
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

  // 6. LEGACY/DIRECT ACCESS GATEKEEPER (Legacy Logic Preserved)
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
