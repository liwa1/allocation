"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, BedDouble } from "lucide-react";
import { IHouse } from "@/models/houseModel";
import { ADMIN_PHONE } from "@/lib/mockData";

interface HouseCardProps {
  house: IHouse;
}

export default function HouseCard({ house }: HouseCardProps) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#DDE3EA]">
      <Link href={`/house/${house._id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={house.pictures[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"}
            alt={house.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A2517]/70 to-transparent p-4">
            <p className="text-white font-bold text-xl">
              {house.price} <span className="text-sm font-normal">TND/night</span>
            </p>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link href={`/house/${house._id}`}>
          <h3 className="font-semibold text-[#1A2517] text-lg truncate hover:text-[#4FC3E7] transition-colors">
            {house.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-[#1A2517]/60">
          <BedDouble className="w-4 h-4" />
          <span className="text-sm">
            {house.roomsNumber} {house.roomsNumber > 1 ? "rooms" : "room"}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#DDE3EA]">
          <span className="text-xs text-[#1A2517]/50">{ADMIN_PHONE}</span>
          <a
            href={`tel:${ADMIN_PHONE}`}
            className="flex items-center gap-2 bg-[#ACC8A2] hover:bg-[#ACC8A2]/80 text-[#1A2517] px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
