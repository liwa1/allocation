"use client";

import Link from "next/link";
import { Home, LayoutDashboard } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  const isAdmin =
    (user?.publicMetadata as { role?: string } | undefined)?.role === "admin";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#DDE3EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#ACC8A2] rounded-xl flex items-center justify-center">
              <Home className="w-5 h-5 text-[#1A2517]" />
            </div>
            <span className="text-xl font-bold text-[#1A2517]">
              Allo<span className="text-[#4FC3E7]">cation</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <SignedIn>
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm text-[#1A2517]/70 hover:text-[#1A2517] transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 bg-[#4FC3E7] hover:bg-[#4FC3E7]/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  Login
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
