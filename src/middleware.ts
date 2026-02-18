import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Clerk middleware disabled until real keys are configured.
// To enable: npm install @clerk/nextjs, add keys to .env.local,
// and replace this with clerkMiddleware().
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
