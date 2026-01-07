import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";
  
  // 🟢 SECURE TOKEN CHECK (Does the user have a pass?)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const isAuthenticated = !!token;

  // Identify Environment
  const currentHost = process.env.NODE_ENV === "production"
    ? hostname.replace(".sakuragroup.co.tz", "")
    : hostname.replace(".localhost:3000", "");

  // ==============================================================
  // 🏰 GATE 1: AXIS PORTAL (axis.sakuragroup.co.tz)
  // ==============================================================
  if (currentHost === "axis") {
    
    // 1. Redirect Root to Portal
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL("/portal", request.url));
    }

    // 2. Protect the Portal (The VIP Room)
    if (url.pathname.startsWith("/portal")) {
       if (!isAuthenticated) {
          // JOURNEY FIX: Send them to login, but remember where they wanted to go
          const loginUrl = new URL("/login", request.url);
          loginUrl.searchParams.set("callbackUrl", url.pathname); 
          return NextResponse.redirect(loginUrl);
       }
       // Rewrite URL to internal folder
       return NextResponse.rewrite(new URL(`/axis${url.pathname}`, request.url));
    }

    // 3. Manage Login Page (The Entry Door)
    if (url.pathname.startsWith("/login")) {
       // JOURNEY FIX: If already logged in, don't show login page. Go to dashboard.
       if (isAuthenticated) {
          return NextResponse.redirect(new URL("/portal", request.url));
       }
       return NextResponse.rewrite(new URL("/axis/login", request.url));
    }

    // 4. Allow Public Assets / NextAuth API
    // (Everything else just rewrites to the axis folder)
    return NextResponse.rewrite(new URL(`/axis${url.pathname}`, request.url));
  }

  // ==============================================================
  // 💳 GATE 2: PAYMENTS (pay.sakuragroup.co.tz)
  // ==============================================================
  if (currentHost === "pay") {
    return NextResponse.rewrite(new URL(`/pay${url.pathname}`, request.url));
  }

  // ==============================================================
  // 🌍 GATE 3: PUBLIC SITE (sakuragroup.co.tz)
  // ==============================================================
  // Block direct access to internal folders
  if (url.pathname.startsWith("/axis") || url.pathname.startsWith("/pay")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)"],
};
