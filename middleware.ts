import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  
  const hostname = request.headers.get("host") || "";
  const isAxisSubdomain = hostname.startsWith("axis.");

  // 1. SAFETY ZONE
  if (
    path.startsWith("/api") || 
    path.startsWith("/_next") || 
    path.startsWith("/static") ||
    path.includes(".")
  ) {
    return NextResponse.next();
  }

  // 2. SESSION ANALYSIS
  // Instead of just 'has', we get the 'value' to check roles
  const sessionCookie = request.cookies.get("axis_session");
  const sessionValue = sessionCookie?.value;
  const hasSession = !!sessionValue;
  const isAdmin = sessionValue === "admin_master";

  // 3. ADMIN PROTECTION
  // Strictly prevent non-admins from hitting the admin routes
  if (path.startsWith("/axis/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/axis/login", request.url));
  }

  // 4. SUBDOMAIN ROUTING & PORTAL PROTECTION
  if (isAxisSubdomain) {
    // Redirect Subdomain Root to Login if no session
    if (path === "/" && !hasSession) {
      return NextResponse.redirect(new URL("/axis/login", request.url));
    }
    
    // Transparently rewrite Root to Portal if session exists
    if (path === "/" && hasSession) {
      return NextResponse.rewrite(new URL("/axis/portal", request.url));
    }

    // Optional: Clean URL for login on subdomain
    if (path === "/login") {
      return NextResponse.rewrite(new URL("/axis/login", request.url));
    }
  }

  // 5. LEGACY/DIRECT ACCESS GATEKEEPER
  const isPortalRoute = path.startsWith("/axis/portal");
  if (isPortalRoute && !hasSession) {
    return NextResponse.redirect(new URL("/axis/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
