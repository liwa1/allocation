import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isDashboard = createRouteMatcher(["/dashboard(.*)"]);
const isApi = createRouteMatcher(["/api/v1(.*)"]);

export const proxy = clerkMiddleware(async (auth, request) => {
  // ─── /dashboard — must be logged in AND have role=admin ──────
  if (isDashboard(request)) {
    const { userId, sessionClaims } = await auth();

    if (!userId) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect_url", request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    const role = (
      sessionClaims?.publicMetadata as { role?: string } | undefined
    )?.role;

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // ─── /api/v1/* — same-origin only (skipped in dev) ───────────
  if (isApi(request)) {
    const isDev = process.env.NODE_ENV === "development";

    if (!isDev) {
      const origin = request.headers.get("origin");
      const host = request.headers.get("host");

      if (origin) {
        const allowed = [
          `https://${host}`,
          `http://${host}`,
          process.env.NEXT_PUBLIC_SITE_URL,
        ].filter(Boolean);

        if (!allowed.includes(origin)) {
          return NextResponse.json(
            { error: "Forbidden: cross-origin request" },
            { status: 403 }
          );
        }
      }
    }
  }
});

export const config = {
  matcher: [
    "/dashboard(.*)",
    "/api/v1(.*)",
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};
