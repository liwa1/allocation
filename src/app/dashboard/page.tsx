"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { ADMIN_PHONE } from "@/lib/mockData";
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
  RefreshCw,
  Upload,
  ImageIcon,
} from "lucide-react";

export default function DashboardPage() {
  const [houses, setHouses] = useState<IHouse[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const fetchHouses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/houses");
      const data = await res.json();
      if (Array.isArray(data)) {
        setHouses(data);
      } else if (data?.error) {
        console.error("API error:", data.error);
        setError(data.error);
        setHouses([]);
      } else {
        setHouses([]);
      }
    } catch (err) {
      console.error("Failed to fetch houses:", err);
      setError("Failed to connect to the server");
      setHouses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHouses();
  }, [fetchHouses]);
  const [showForm, setShowForm] = useState(false);
  const [editingHouse, setEditingHouse] = useState<IHouse | null>(null);
  const [uploadedPictures, setUploadedPictures] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: "",
    owner_name: "",
    owner_number: "",
    location: "",
    price: "",
    rooms_number: "",
    has_living_room: true,
    has_kitchen: true,
    description: "",
    pictures: "",
  });

  const resetForm = () => {
    setForm({
      title: "",
      owner_name: "",
      owner_number: "",
      location: "",
      price: "",
      rooms_number: "",
      has_living_room: true,
      has_kitchen: true,
      description: "",
      pictures: "",
    });
    setUploadedPictures([]);
    setEditingHouse(null);
    setShowForm(false);
  };

  const handleEdit = (house: IHouse) => {
    setEditingHouse(house);
    setUploadedPictures(house.pictures);
    setForm({
      title: house.title,
      owner_name: house.owner_name,
      owner_number: String(house.owner_number),
      location: house.location,
      price: String(house.price),
      rooms_number: String(house.rooms_number),
      has_living_room: house.has_living_room,
      has_kitchen: house.has_kitchen,
      description: house.description,
      pictures: "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this house?")) {
      try {
        await fetch(`/api/v1/houses/${id}`, { method: "DELETE" });
        await fetchHouses();
      } catch (err) {
        console.error("Failed to delete house:", err);
      }
    }
  };

  const handleUpload = async (files: FileList) => {
    setUploading(true);
    const fd = new FormData();
    Array.from(files).forEach((f) => fd.append("files", f));
    try {
      const res = await fetch("/api/v1/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.urls) {
        setUploadedPictures((prev) => [...prev, ...data.urls]);
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const extraUrls = form.pictures
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    const allPictures = [...uploadedPictures, ...extraUrls];

    const houseData = {
      title: form.title,
      owner_name: form.owner_name,
      owner_number: Number(form.owner_number),
      location: form.location,
      price: Number(form.price),
      rooms_number: Number(form.rooms_number),
      has_living_room: form.has_living_room,
      has_kitchen: form.has_kitchen,
      description: form.description,
      pictures: allPictures,
    };

    try {
      if (editingHouse) {
        await fetch(`/api/v1/houses/${editingHouse.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(houseData),
        });
      } else {
        await fetch("/api/v1/houses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(houseData),
        });
      }
      await fetchHouses();
    } catch (err) {
      console.error("Failed to save house:", err);
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
          <div className="flex items-center gap-3">
            <button
              onClick={async () => {
                if (confirm("Seed database with sample houses? This replaces existing data.")) {
                  await fetch("/api/v1/seed", { method: "POST" });
                  await fetchHouses();
                }
              }}
              className="flex items-center gap-2 border border-[#DDE3EA] hover:bg-[#DDE3EA] text-[#1A2517] px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              Seed Data
            </button>
            <button
              onClick={fetchHouses}
              className="flex items-center gap-2 border border-[#DDE3EA] hover:bg-[#DDE3EA] text-[#1A2517] p-2.5 rounded-xl transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
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
                      value={form.owner_name}
                      onChange={(e) => setForm({ ...form, owner_name: e.target.value })}
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
                      value={form.owner_number}
                      onChange={(e) => setForm({ ...form, owner_number: e.target.value })}
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
                      value={form.rooms_number}
                      onChange={(e) => setForm({ ...form, rooms_number: e.target.value })}
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
                    Photos
                  </label>

                  {/* Upload Zone */}
                  <div
                    className="border-2 border-dashed border-[#DDE3EA] rounded-xl p-6 text-center cursor-pointer hover:border-[#4FC3E7] transition-colors mb-3"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files.length > 0)
                        handleUpload(e.dataTransfer.files);
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0)
                          handleUpload(e.target.files);
                      }}
                    />
                    {uploading ? (
                      <div className="flex flex-col items-center gap-2 text-[#4FC3E7]">
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        <span className="text-sm">Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-[#1A2517]/40">
                        <Upload className="w-6 h-6" />
                        <span className="text-sm">Click or drag &amp; drop images</span>
                      </div>
                    )}
                  </div>

                  {/* Preview Grid */}
                  {uploadedPictures.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {uploadedPictures.map((url, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                          <Image
                            src={url}
                            alt={`Photo ${i + 1}`}
                            fill
                            className="object-cover"
                            unoptimized={url.includes("supabase")}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setUploadedPictures((prev) =>
                                prev.filter((_, idx) => idx !== i)
                              )
                            }
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* URL fallback */}
                  <div className="flex items-center gap-2 text-xs text-[#1A2517]/40 mb-1">
                    <ImageIcon className="w-3 h-3" />
                    Or add image URLs (comma-separated)
                  </div>
                  <textarea
                    value={form.pictures}
                    onChange={(e) => setForm({ ...form, pictures: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDE3EA] focus:border-[#4FC3E7] focus:ring-1 focus:ring-[#4FC3E7] outline-none transition-colors resize-none text-sm"
                    placeholder="https://example.com/img1.jpg, ..."
                  />
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.has_living_room}
                      onChange={(e) => setForm({ ...form, has_living_room: e.target.checked })}
                      className="w-4 h-4 accent-[#4FC3E7]"
                    />
                    <span className="text-sm text-[#1A2517]">Living Room</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.has_kitchen}
                      onChange={(e) => setForm({ ...form, has_kitchen: e.target.checked })}
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
                    key={house.id}
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
                          <User className="w-3 h-3" /> {house.owner_name}
                        </span>
                        <span className="text-xs text-[#1A2517]/50 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {house.owner_number}
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
                        <BedDouble className="w-3 h-3" /> {house.rooms_number}
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
                          onClick={() => handleDelete(house.id!)}
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

          {loading && (
            <div className="text-center py-12">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#4FC3E7] mb-2" />
              <p className="text-[#1A2517]/40">Loading houses...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-12">
              <p className="text-red-500 font-medium mb-2">Error: {error}</p>
              <p className="text-[#1A2517]/40 text-sm mb-4">Make sure the database is set up. Try seeding data first.</p>
              <button
                onClick={async () => {
                  await fetch("/api/v1/seed", { method: "POST" });
                  await fetchHouses();
                }}
                className="inline-flex items-center gap-2 bg-[#4FC3E7] hover:bg-[#4FC3E7]/90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              >
                Seed Database
              </button>
            </div>
          )}

          {!loading && !error && houses.length === 0 && (
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
