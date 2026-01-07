import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 🟢 OPEN GATE STRATEGY
  // No checks. No redirects. No tokens required.
  // Everyone is allowed in.
  return NextResponse.next();
}

export const config = {
  // Keep the matcher to avoid errors, but the function above does nothing.
  matcher: ["/axis/:path*", "/admin/:path*"],
};
