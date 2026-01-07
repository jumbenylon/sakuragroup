import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  // 🔎 DETECT ENVIRONMENT
  // If we are on "axis" subdomain OR inside a Codespace/Localhost
  const isAxis = hostname.startsWith("axis.") || hostname.includes("github.dev") || hostname.includes("localhost");

  // ==============================================================
  // 🏰 GATE 1: AXIS PORTAL (The App)
  // ==============================================================
  if (isAxis) {
    
    // 1. Handle Root -> Portal
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL("/portal", request.url));
    }

    // 2. Protect Portal Routes
    if (url.pathname.startsWith("/portal")) {
       if (!isAuthenticated) {
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set("callbackUrl", url.pathname); 
          return NextResponse.redirect(loginUrl);
       }
       return NextResponse.rewrite(new URL(`/axis${url.pathname}`, request.url));
    }

    // 3. Handle Login Page
    if (url.pathname.startsWith("/login")) {
       if (isAuthenticated) {
          return NextResponse.redirect(new URL("/portal", request.url));
       }
       return NextResponse.rewrite(new URL("/axis/login", request.url));
    }

    // 4. Rewrite all other assets
    // If it's an API route, let it pass through naturally
    if (url.pathname.startsWith("/api/")) {
        return NextResponse.next();
    }

    return NextResponse.rewrite(new URL(`/axis${url.pathname}`, request.url));
  }

  // Fallback for everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|_static/|[\\w-]+\\.\\w+).*)"],
};
