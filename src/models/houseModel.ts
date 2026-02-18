export interface IHouse {
  id?: string;
  owner_name: string;
  owner_number: number;
  location: string;
  pictures: string[];
  price: number;
  rooms_number: number;
  has_living_room: boolean;
  has_kitchen: boolean;
  title: string;
  description: string;
  created_at?: string;
}
