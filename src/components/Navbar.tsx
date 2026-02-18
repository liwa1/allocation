"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, LayoutDashboard, LogIn, LogOut, User } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { User as SupaUser } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<SupaUser | null>(null);
  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  const isAdmin =
    user?.app_metadata?.role === "admin" ||
    user?.user_metadata?.role === "admin";

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
            {isAdmin && (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-sm text-[#1A2517]/70 hover:text-[#1A2517] transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <span className="hidden sm:flex items-center gap-1.5 text-sm text-[#1A2517]/60">
                  <User className="w-3.5 h-3.5" />
                  {user.email?.split("@")[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-[#1A2517]/70 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 bg-[#4FC3E7] hover:bg-[#4FC3E7]/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
