import { NextResponse } from "next/server";
import { getHouseById, updateHouse, deleteHouse } from "@/services/houseService";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const house = await getHouseById(id);
    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }
    return NextResponse.json(house);
  } catch (error) {
    console.error("Error fetching house:", error);
    return NextResponse.json(
      { error: "Failed to fetch house" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const house = await updateHouse(id, body);
    if (!house) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }
    return NextResponse.json(house);
  } catch (error) {
    console.error("Error updating house:", error);
    return NextResponse.json(
      { error: "Failed to update house" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteHouse(id);
    if (!success) {
      return NextResponse.json({ error: "House not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "House deleted successfully" });
  } catch (error) {
    console.error("Error deleting house:", error);
    return NextResponse.json(
      { error: "Failed to delete house" },
      { status: 500 }
    );
  }
}
