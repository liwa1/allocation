import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHouseById } from "@/services/houseService";
import { ADMIN_PHONE, mockHouses } from "@/lib/mockData";
import ImageCarousel from "@/components/ImageCarousel";
import {
  Phone,
  BedDouble,
  Sofa,
  CookingPot,
  MapPin,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

interface HousePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: HousePageProps): Promise<Metadata> {
  const { id } = await params;
  let house = await getHouseById(id).catch(() => null);
  if (!house) house = mockHouses.find((h) => h.id === id) || null;
  if (!house) return { title: "House Not Found" };

  return {
    title: `${house.title} - Rental House Tunisia Summer | Allocation`,
    description: `${house.description} Book this ${house.rooms_number}-room house for ${house.price} TND/night. Rental house tunisia summer.`,
    keywords: [
      "rental",
      "house",
      "tunisia",
      "summer",
      house.title,
      "vacation",
    ],
  };
}

export default async function HousePage({ params }: HousePageProps) {
  const { id } = await params;
  let house = await getHouseById(id).catch(() => null);
  if (!house) house = mockHouses.find((h) => h.id === id) || null;

  if (!house) {
    notFound();
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#1A2517]/60 hover:text-[#1A2517] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to houses
        </Link>
      </div>

      {/* Image Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ImageCarousel
          images={house.pictures}
          alt={house.title}
          className="max-h-[500px]"
        />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#1A2517]">
                {house.title}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-[#1A2517]/60">
                <MapPin className="w-4 h-4" />
                <span>Tunisia</span>
              </div>
            </div>

            <p className="text-[#1A2517]/70 text-lg leading-relaxed">
              {house.description}
            </p>

            {/* Features */}
            <div>
              <h2 className="text-xl font-semibold text-[#1A2517] mb-4">
                Features
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#DDE3EA]">
                  <div className="w-10 h-10 bg-[#4FC3E7]/10 rounded-lg flex items-center justify-center">
                    <BedDouble className="w-5 h-5 text-[#4FC3E7]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A2517]">
                      {house.rooms_number}
                    </p>
                    <p className="text-sm text-[#1A2517]/50">
                      {house.rooms_number > 1 ? "Bedrooms" : "Bedroom"}
                    </p>
                  </div>
                </div>

                {house.has_living_room && (
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#DDE3EA]">
                    <div className="w-10 h-10 bg-[#ACC8A2]/20 rounded-lg flex items-center justify-center">
                      <Sofa className="w-5 h-5 text-[#ACC8A2]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A2517]">1</p>
                      <p className="text-sm text-[#1A2517]/50">Living Room</p>
                    </div>
                  </div>
                )}

                {house.has_kitchen && (
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#DDE3EA]">
                    <div className="w-10 h-10 bg-[#DDE3EA] rounded-lg flex items-center justify-center">
                      <CookingPot className="w-5 h-5 text-[#1A2517]/60" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1A2517]">1</p>
                      <p className="text-sm text-[#1A2517]/50">Kitchen</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-[#DDE3EA] p-6 sticky top-24 space-y-6 shadow-sm">
              <div>
                <span className="text-3xl font-bold text-[#1A2517]">
                  {house.price} TND
                </span>
                <span className="text-[#1A2517]/50"> / night</span>
              </div>

              <div className="space-y-3">
                <div className="bg-[#ACC8A2]/10 rounded-xl p-4">
                  <p className="text-sm font-medium text-[#1A2517]">
                    Payment Method
                  </p>
                  <p className="text-[#1A2517]/60 text-sm mt-1">
                    Cash only — pay upon arrival
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-[#1A2517]/60">
                  Contact admin to book
                </p>
                <p className="text-lg font-semibold text-[#1A2517]">
                  {ADMIN_PHONE}
                </p>
                <a
                  href={`tel:${ADMIN_PHONE}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#4FC3E7] hover:bg-[#4FC3E7]/90 text-white py-3.5 rounded-xl font-semibold transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call to Book
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
