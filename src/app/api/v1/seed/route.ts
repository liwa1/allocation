import { NextResponse } from "next/server";
import { supabase } from "@/lib/mongodb";
import { mockHouses } from "@/lib/mockData";

export async function POST() {
  try {
    // Clear existing data
    await supabase.from("houses").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    // Insert mock data (without id so Supabase generates UUIDs)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const housesData = mockHouses.map(({ id, created_at, ...rest }) => rest);
    const { data: inserted, error } = await supabase
      .from("houses")
      .insert(housesData)
      .select();

    if (error) throw error;

    return NextResponse.json({
      message: `Seeded ${inserted?.length || 0} houses successfully`,
      count: inserted?.length || 0,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}
