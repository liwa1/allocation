import { supabase } from "@/lib/mongodb";
import { IHouse } from "@/models/houseModel";

export async function getHouses(): Promise<IHouse[]> {
  const { data, error } = await supabase
    .from("houses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return JSON.parse(JSON.stringify(data || []));
}

export async function getHouseById(id: string): Promise<IHouse | null> {
  const { data, error } = await supabase
    .from("houses")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return JSON.parse(JSON.stringify(data));
}

export async function createHouse(data: Omit<IHouse, "id">): Promise<IHouse> {
  const { data: house, error } = await supabase
    .from("houses")
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return JSON.parse(JSON.stringify(house));
}

export async function updateHouse(
  id: string,
  data: Partial<IHouse>
): Promise<IHouse | null> {
  const { data: house, error } = await supabase
    .from("houses")
    .update(data)
    .eq("id", id)
    .select()
    .single();

  if (error) return null;
  return JSON.parse(JSON.stringify(house));
}

export async function deleteHouse(id: string): Promise<boolean> {
  const { error } = await supabase.from("houses").delete().eq("id", id);
  return !error;
}

