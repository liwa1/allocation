import { connectDB } from "@/lib/mongodb";
import House, { IHouse } from "@/models/houseModel";

export async function getHouses(): Promise<IHouse[]> {
  await connectDB();
  const houses = await House.find({}).lean();
  return JSON.parse(JSON.stringify(houses));
}

export async function getHouseById(id: string): Promise<IHouse | null> {
  await connectDB();
  const house = await House.findById(id).lean();
  if (!house) return null;
  return JSON.parse(JSON.stringify(house));
}

export async function createHouse(data: Omit<IHouse, "_id">): Promise<IHouse> {
  await connectDB();
  const house = await House.create(data);
  return JSON.parse(JSON.stringify(house.toObject()));
}

export async function updateHouse(
  id: string,
  data: Partial<IHouse>
): Promise<IHouse | null> {
  await connectDB();
  const house = await House.findByIdAndUpdate(id, data, { new: true }).lean();
  if (!house) return null;
  return JSON.parse(JSON.stringify(house));
}

export async function deleteHouse(id: string): Promise<boolean> {
  await connectDB();
  const result = await House.findByIdAndDelete(id);
  return !!result;
}
