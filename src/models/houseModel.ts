import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHouse {
  _id?: string;
  ownerName: string;
  ownerNumber: number;
  location: string;
  pictures: string[];
  price: number;
  roomsNumber: number;
  hasLivingRoom: boolean;
  hasKitchen: boolean;
  title: string;
  description: string;
}

export interface IHouseDocument extends Omit<IHouse, "_id">, Document {}

const houseSchema = new Schema<IHouseDocument>(
  {
    ownerName: { type: String, required: true },
    ownerNumber: { type: Number, required: true },
    location: { type: String, required: true },
    pictures: { type: [String], default: [] },
    price: { type: Number, required: true },
    roomsNumber: { type: Number, required: true },
    hasLivingRoom: { type: Boolean, default: true },
    hasKitchen: { type: Boolean, default: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

const House: Model<IHouseDocument> =
  mongoose.models.House || mongoose.model<IHouseDocument>("House", houseSchema);

export default House;
