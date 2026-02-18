import { IHouse } from "@/models/houseModel";

export const ADMIN_PHONE = "+216 71 234 567";

export const mockHouses: IHouse[] = [
  {
    _id: "6650a1b2c3d4e5f6a7b8c9d0",
    ownerName: "Ahmed Ben Ali",
    ownerNumber: 21698123456,
    location: "Hammamet, Tunisia",
    pictures: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    price: 120,
    roomsNumber: 3,
    hasLivingRoom: true,
    hasKitchen: true,
    title: "Villa Jasmin Hammamet",
    description:
      "Magnifique villa avec vue sur mer à Hammamet. Piscine privée, jardin tropical et accès direct à la plage. Idéale pour des vacances en famille.",
  },
  {
    _id: "6650a1b2c3d4e5f6a7b8c9d1",
    ownerName: "Fatma Trabelsi",
    ownerNumber: 21655987654,
    location: "Sousse, Tunisia",
    pictures: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
    ],
    price: 85,
    roomsNumber: 2,
    hasLivingRoom: true,
    hasKitchen: true,
    title: "Appartement Bord de Mer Sousse",
    description:
      "Appartement moderne et lumineux situé en front de mer à Sousse. Vue panoramique sur la Méditerranée, à proximité de la médina et des restaurants.",
  },
  {
    _id: "6650a1b2c3d4e5f6a7b8c9d2",
    ownerName: "Mohamed Gharbi",
    ownerNumber: 21622345678,
    location: "Djerba, Tunisia",
    pictures: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    ],
    price: 150,
    roomsNumber: 4,
    hasLivingRoom: true,
    hasKitchen: true,
    title: "Maison Traditionnelle Djerba",
    description:
      "Maison traditionnelle djerbienne entièrement rénovée. Architecture typique, patio intérieur, et terrasse avec vue sur les oliviers. Calme et authenticité garantis.",
  },
  {
    _id: "6650a1b2c3d4e5f6a7b8c9d3",
    ownerName: "Leila Boussaid",
    ownerNumber: 21690112233,
    location: "Sidi Bou Said, Tunisia",
    pictures: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80",
    ],
    price: 200,
    roomsNumber: 3,
    hasLivingRoom: true,
    hasKitchen: true,
    title: "Dar Sidi Bou Said",
    description:
      "Charmante maison bleue et blanche à Sidi Bou Said. Terrasse panoramique, décoration artisanale et proximité du café des Nattes. Un séjour inoubliable.",
  },
  {
    _id: "6650a1b2c3d4e5f6a7b8c9d4",
    ownerName: "Karim Mzali",
    ownerNumber: 21653446677,
    location: "Tabarka, Tunisia",
    pictures: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    ],
    price: 95,
    roomsNumber: 2,
    hasLivingRoom: true,
    hasKitchen: false,
    title: "Chalet Corail Tabarka",
    description:
      "Chalet confortable dans la forêt de Tabarka. Entouré de pins et de chênes-lièges, à quelques minutes de la plage et du port de pêche.",
  },
  {
    _id: "6650a1b2c3d4e5f6a7b8c9d5",
    ownerName: "Sonia Hammami",
    ownerNumber: 21697889900,
    location: "Nabeul, Tunisia",
    pictures: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    price: 75,
    roomsNumber: 2,
    hasLivingRoom: true,
    hasKitchen: true,
    title: "Studio Nabeul Centre",
    description:
      "Studio entièrement équipé au centre de Nabeul. Proche du marché, de la plage et de tous les commerces. Parfait pour un couple ou une petite famille.",
  },
];
