import Link from "next/link";
import { ShieldX, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFB] px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ShieldX className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#1A2517] mb-2">
          Access Denied
        </h1>
        <p className="text-[#1A2517]/60 mb-6">
          You don&apos;t have admin privileges to access the dashboard. Contact
          the administrator to request access.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#4FC3E7] hover:bg-[#4FC3E7]/90 text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
