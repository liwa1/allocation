"use client";

import { useState } from "react";
import { mockHouses, ADMIN_PHONE } from "@/lib/mockData";
import { IHouse } from "@/models/houseModel";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  BedDouble,
  MapPin,
  Phone,
  User,
} from "lucide-react";

export default function DashboardPage() {
  const [houses, setHouses] = useState<IHouse[]>(mockHouses);
  const [showForm, setShowForm] = useState(false);
  const [editingHouse, setEditingHouse] = useState<IHouse | null>(null);
  const [form, setForm] = useState({
    title: "",
    ownerName: "",
    ownerNumber: "",
    location: "",
    price: "",
    roomsNumber: "",
    hasLivingRoom: true,
    hasKitchen: true,
    description: "",
    pictures: "",
  });

  const resetForm = () => {
    setForm({
      title: "",
      ownerName: "",
      ownerNumber: "",
      location: "",
      price: "",
      roomsNumber: "",
      hasLivingRoom: true,
      hasKitchen: true,
      description: "",
      pictures: "",
    });
    setEditingHouse(null);
    setShowForm(false);
  };

  const handleEdit = (house: IHouse) => {
    setEditingHouse(house);
    setForm({
      title: house.title,
      ownerName: house.ownerName,
      ownerNumber: String(house.ownerNumber),
      location: house.location,
      price: String(house.price),
      roomsNumber: String(house.roomsNumber),
      hasLivingRoom: house.hasLivingRoom,
      hasKitchen: house.hasKitchen,
      description: house.description,
      pictures: house.pictures.join(", "),
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this house?")) {
      setHouses(houses.filter((h) => h._id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const houseData: IHouse = {
      _id: editingHouse?._id || String(Date.now()),
      title: form.title,
      ownerName: form.ownerName,
      ownerNumber: Number(form.ownerNumber),
      location: form.location,
      price: Number(form.price),
      roomsNumber: Number(form.roomsNumber),
      hasLivingRoom: form.hasLivingRoom,
      hasKitchen: form.hasKitchen,
      description: form.description,
      pictures: form.pictures.split(",").map((p) => p.trim()).filter(Boolean),
    };

    if (editingHouse) {
      setHouses(houses.map((h) => (h._id === editingHouse._id ? houseData : h)));
    } else {
      setHouses([...houses, houseData]);
    }
    resetForm();
  };

  return (
    <main className="min-h-screen bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#1A2517]">Dashboard</h1>
            <p className="text-[#1A2517]/60 mt-1">Manage your house listings</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-[#4FC3E7] hover:bg-[#4FC3E7]/90 text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add House
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#1A2517]">
                  {editingHouse ? "Edit House" : "Add New House"}
                </h2>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-[#DDE3EA] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1A2517] mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDE3EA] focus:border-[#4FC3E7] focus:ring-1 focus:ring-[#4FC3E7] outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A2517] mb-1">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      value={form.ownerName}
                      onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDE3EA] focus:border-[#4FC3E7] focus:ring-1 focus:ring-[#4FC3E7] outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A2517] mb-1">
                      Owner Number
                    </label>
                    <input
                      type="number"
                      value={form.ownerNumber}
                      onChange={(e) => setForm({ ...form, ownerNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDE3EA] focus:border-[#4FC3E7] focus:ring-1 focus:ring-[#4FC3E7] outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A2517] mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDE3EA] focus:border-[#4FC3E7] focus:ring-1 focus:ring-[#4FC3E7] outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A2517] mb-1">
                      Price (TND/night)
                    </label>
                    <input
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDE3EA] focus:border-[#4FC3E7] focus:ring-1 focus:ring-[#4FC3E7] outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1A2517] mb-1">
                      Rooms
                    </label>
                    <input
                      type="number"
                      value={form.roomsNumber}
                      onChange={(e) => setForm({ ...form, roomsNumber: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#DDE3EA] focus:border-[#4FC3E7] focus:ring-1 focus:ring-[#4FC3E7] outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A2517] mb-1">
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDE3EA] focus:border-[#4FC3E7] focus:ring-1 focus:ring-[#4FC3E7] outline-none transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1A2517] mb-1">
                    Pictures (comma-separated URLs)
                  </label>
                  <textarea
                    value={form.pictures}
                    onChange={(e) => setForm({ ...form, pictures: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDE3EA] focus:border-[#4FC3E7] focus:ring-1 focus:ring-[#4FC3E7] outline-none transition-colors resize-none"
                    placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hasLivingRoom}
                      onChange={(e) => setForm({ ...form, hasLivingRoom: e.target.checked })}
                      className="w-4 h-4 accent-[#4FC3E7]"
                    />
                    <span className="text-sm text-[#1A2517]">Living Room</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.hasKitchen}
                      onChange={(e) => setForm({ ...form, hasKitchen: e.target.checked })}
                      className="w-4 h-4 accent-[#4FC3E7]"
                    />
                    <span className="text-sm text-[#1A2517]">Kitchen</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-xl border border-[#DDE3EA] text-[#1A2517] hover:bg-[#DDE3EA] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#4FC3E7] hover:bg-[#4FC3E7]/90 text-white font-medium transition-colors"
                  >
                    {editingHouse ? "Save Changes" : "Add House"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Houses Table */}
        <div className="bg-white rounded-2xl border border-[#DDE3EA] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#DDE3EA] bg-[#F8FAFB]">
                  <th className="text-left px-6 py-4 text-sm font-medium text-[#1A2517]/60">
                    House
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[#1A2517]/60">
                    Owner
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[#1A2517]/60">
                    Location
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[#1A2517]/60">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[#1A2517]/60">
                    Rooms
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-[#1A2517]/60">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {houses.map((house) => (
                  <tr
                    key={house._id}
                    className="border-b border-[#DDE3EA] last:border-b-0 hover:bg-[#F8FAFB] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={house.pictures[0] || ""}
                            alt={house.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-[#1A2517] text-sm">
                          {house.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-[#1A2517] flex items-center gap-1">
                          <User className="w-3 h-3" /> {house.ownerName}
                        </span>
                        <span className="text-xs text-[#1A2517]/50 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {house.ownerNumber}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#1A2517]/70 flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {house.location}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-[#1A2517]">
                        {house.price} TND
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#1A2517]/70 flex items-center gap-1">
                        <BedDouble className="w-3 h-3" /> {house.roomsNumber}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(house)}
                          className="p-2 hover:bg-[#4FC3E7]/10 rounded-lg transition-colors text-[#4FC3E7]"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(house._id!)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {houses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#1A2517]/40">No houses yet. Add your first listing!</p>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-2xl border border-[#DDE3EA] p-6">
            <p className="text-sm text-[#1A2517]/60">Total Listings</p>
            <p className="text-3xl font-bold text-[#1A2517] mt-1">{houses.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#DDE3EA] p-6">
            <p className="text-sm text-[#1A2517]/60">Avg Price/Night</p>
            <p className="text-3xl font-bold text-[#1A2517] mt-1">
              {houses.length
                ? Math.round(houses.reduce((s, h) => s + h.price, 0) / houses.length)
                : 0}{" "}
              <span className="text-sm font-normal text-[#1A2517]/50">TND</span>
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-[#DDE3EA] p-6">
            <p className="text-sm text-[#1A2517]/60">Admin Contact</p>
            <p className="text-lg font-bold text-[#1A2517] mt-1">{ADMIN_PHONE}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
