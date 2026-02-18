import { NextResponse } from "next/server";
import { getHouses, createHouse } from "@/services/houseService";

export async function GET() {
  try {
    const houses = await getHouses();
    return NextResponse.json(houses);
  } catch (error) {
    console.error("Error fetching houses:", error);
    return NextResponse.json(
      { error: "Failed to fetch houses" },
      { status: 500 }
    );
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
