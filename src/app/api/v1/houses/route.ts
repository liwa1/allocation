import { NextResponse } from "next/server";
import { getHouses, createHouse } from "@/services/houseService";
import { mockHouses } from "@/lib/mockData";

export async function GET() {
  try {
    const houses = await getHouses();
    if (houses.length === 0) {
      return NextResponse.json(mockHouses);
    }
    return NextResponse.json(houses);
  } catch (error) {
    console.error("Error fetching houses (falling back to mock):", error);
    return NextResponse.json(mockHouses);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const house = await createHouse(body);
    return NextResponse.json(house, { status: 201 });
  } catch (error) {
    console.error("Error creating house:", error);
    return NextResponse.json(
      { error: "Failed to create house" },
      { status: 500 }
    );
  }
}
