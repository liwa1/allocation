"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IHouse } from "@/models/houseModel";

interface HeroCarouselProps {
  houses: IHouse[];
}

export default function HeroCarousel({ houses }: HeroCarouselProps) {
  const featured = houses.slice(0, 4);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === featured.length - 1 ? 0 : c + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [featured.length]);

  const prev = () =>
    setCurrent((c) => (c === 0 ? featured.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === featured.length - 1 ? 0 : c + 1));

  const house = featured[current];

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {featured.map((h, i) => (
        <div
          key={h._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={h.pictures[0]}
            alt={h.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-[#1A2517]/80 via-[#1A2517]/20 to-transparent" />

      <div className="absolute bottom-20 left-0 right-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#ACC8A2] text-sm font-medium mb-2 tracking-wider uppercase">
            Recommended for you
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {house.title}
          </h1>
          <p className="text-white/80 text-lg mb-4 max-w-xl">
            {house.description.slice(0, 120)}...
          </p>
          <div className="flex items-center gap-4">
            <span className="text-white text-2xl font-bold">
              {house.price} TND
              <span className="text-sm font-normal text-white/70">/night</span>
            </span>
            <Link
              href={`/house/${house._id}`}
              className="bg-[#4FC3E7] hover:bg-[#4FC3E7]/90 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {featured.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "bg-white w-8" : "bg-white/40 w-4"
            }`}
          />
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
