import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  // 1. IDENTIFY SUBDOMAIN
  // Localhost: "axis.localhost:3000" -> "axis"
  // Production: "axis.sakuragroup.co.tz" -> "axis"
  const currentHost = process.env.NODE_ENV === "production"
    ? hostname.replace(".sakuragroup.co.tz", "")
    : hostname.replace(".localhost:3000", "");

  // -----------------------------------------------------------
  // ROUTE 1: AXIS PORTAL (axis.sakuragroup.co.tz)
  // -----------------------------------------------------------
  if (currentHost === "axis") {
    // 🔒 Security Check (Optional: You can enable this later if you want strict locking)
    // const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    // if (!token && !url.pathname.startsWith("/login")) {
    //    return NextResponse.redirect(new URL("/axis/login", request.url));
    // }

    // REWRITE: Show content from /app/axis folder
    // User sees: axis.sakuragroup.co.tz/portal
    // Server delivers: app/axis/portal/page.tsx
    // We append `/axis` to the path internally so Next.js finds the file.
    return NextResponse.rewrite(new URL(`/axis${url.pathname}`, request.url));
  }

  // -----------------------------------------------------------
  // ROUTE 2: PAYMENTS (pay.sakuragroup.co.tz)
  // -----------------------------------------------------------
  if (currentHost === "pay") {
    // REWRITE: Show content from /app/pay folder
    return NextResponse.rewrite(new URL(`/pay${url.pathname}`, request.url));
  }

  // -----------------------------------------------------------
  // ROUTE 3: MAIN WEBSITE (sakuragroup.co.tz)
  // -----------------------------------------------------------
  // Prevent direct access to "app/axis" folder via main domain
  if (url.pathname.startsWith("/axis") || url.pathname.startsWith("/pay")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  
  // Default: Serve the Marketing site (app/(marketing))
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/|_next/|_static/|[\\w-]+\\.\\w+).*)"],
};
