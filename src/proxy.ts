import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ─── 1. Refresh Supabase session on every request ──────────────
  const { supabase, user, supabaseResponse } = await updateSession(request);

  // ─── 2. /dashboard — admin-only ────────────────────────────────
  if (pathname.startsWith("/dashboard")) {
    // Not logged in → redirect to login
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Check admin role from user metadata
    const role =
      user.app_metadata?.role ||
      user.user_metadata?.role ||
      "user";

    if (role !== "admin") {
      const deniedUrl = request.nextUrl.clone();
      deniedUrl.pathname = "/unauthorized";
      return NextResponse.redirect(deniedUrl);
    }
  }

  // ─── 3. /api/v1/* — same-origin only (skip in dev mode) ───────
  if (pathname.startsWith("/api/v1")) {
    const isDev = process.env.NODE_ENV === "development";

    if (!isDev) {
      const origin = request.headers.get("origin");
      const referer = request.headers.get("referer");
      const host = request.headers.get("host");

      // Allow requests with no origin (server-side fetches, curl, etc.)
      // but block cross-origin browser requests
      if (origin) {
        const allowedOrigins = [
          `https://${host}`,
          `http://${host}`,
          process.env.NEXT_PUBLIC_SITE_URL,
        ].filter(Boolean);

        if (!allowedOrigins.includes(origin)) {
          return NextResponse.json(
            { error: "Forbidden: cross-origin request" },
            { status: 403 }
          );
        }
      } else if (referer) {
        // Check referer as fallback for same-origin validation
        const refererUrl = new URL(referer);
        if (refererUrl.host !== host) {
          return NextResponse.json(
            { error: "Forbidden: cross-origin request" },
            { status: 403 }
          );
        }
      }
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/v1/:path*",
    "/auth/callback",
  ],
};
