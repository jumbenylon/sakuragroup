import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const path = url.pathname;
  
  // Get hostname (e.g., 'axis.sakuragroup.co.tz' or 'localhost:3000')
  const hostname = request.headers.get("host") || "";
  const isAxisSubdomain = hostname.startsWith("axis.");

  // ----------------------------------------------------------------
  // 1. SAFETY ZONE: Always allow API, Static, and Next.js internals
  // ----------------------------------------------------------------
  if (
    path.startsWith("/api") || 
    path.startsWith("/_next") || 
    path.startsWith("/static") ||
    path.includes(".") // Catch files like favicon.ico, robots.txt
  ) {
    return NextResponse.next();
  }

  // ----------------------------------------------------------------
  // 2. SUBDOMAIN ROUTING (The Fix)
  // ----------------------------------------------------------------
  // If user visits 'axis.sakuragroup.co.tz/', rewrite it to show '/axis/portal'
  if (isAxisSubdomain) {
    // Rewrite Root ('/') to Portal
    if (path === "/") {
      // Check session before rewriting (Gatekeeper for Subdomain Root)
      const hasSession = request.cookies.has("axis_session");
      if (!hasSession) {
        // If no session on subdomain root, Redirect to Login
        // We use a transparent rewrite for login too, or a hard redirect?
        // Hard redirect is safer for auth flows.
        return NextResponse.redirect(new URL("/axis/login", request.url));
      }
      
      // Valid session? Show the portal content transparently
      return NextResponse.rewrite(new URL("/axis/portal", request.url));
    }

    // Optional: Make '/login' on subdomain point to actual login path
    if (path === "/login") {
      return NextResponse.rewrite(new URL("/axis/login", request.url));
    }
  }

  // ----------------------------------------------------------------
  // 3. LEGACY/DIRECT ACCESS ROUTING
  // ----------------------------------------------------------------
  // This handles cases where user visits 'sakuragroup.co.tz/axis/portal' directly
  
  const isPortalRoute = path.startsWith("/axis/portal");
  const hasSession = request.cookies.has("axis_session");

  if (isPortalRoute && !hasSession) {
    const loginUrl = new URL("/axis/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// ----------------------------------------------------------------
// CONFIGURATION
// ----------------------------------------------------------------
export const config = {
  // CRITICAL UPDATE:
  // Must listen to "/" to catch the subdomain entry point.
  // We exclude static files via regex to keep performance high.
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
