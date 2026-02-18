import HouseCard from "@/components/HouseCard";
import HeroCarousel from "@/components/HeroCarousel";
import { getHouses } from "@/services/houseService";
import { mockHouses } from "@/lib/mockData";
import { Search } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let houses;
  try {
    houses = await getHouses();
    if (!houses.length) houses = mockHouses;
  } catch {
    houses = mockHouses;
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <HeroCarousel houses={houses} />
      </section>

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-4 border border-[#DDE3EA]">
          <Search className="w-5 h-5 text-[#4FC3E7]" />
          <input
            type="text"
            placeholder="Search houses by name..."
            className="flex-1 outline-none text-[#1A2517] placeholder:text-[#1A2517]/40 bg-transparent"
          />
          <button className="bg-[#4FC3E7] hover:bg-[#4FC3E7]/90 text-white px-6 py-2.5 rounded-xl font-medium transition-colors">
            Search
          </button>
        </div>
      </section>

      {/* Recommended Houses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#1A2517]">
              Featured Houses
            </h2>
            <p className="text-[#1A2517]/60 mt-1">
              Handpicked summer houses for your vacation in Tunisia
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house) => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1A2517] py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your dream summer house in Tunisia awaits
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Cash payments only. Simple, secure, and trusted by Tunisians abroad.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="tel:+21671234567"
              className="bg-[#ACC8A2] hover:bg-[#ACC8A2]/90 text-[#1A2517] px-8 py-3.5 rounded-xl font-semibold transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A2517] border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/50 text-sm">
            © 2026 Allocation. Rental house Tunisia summer. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
