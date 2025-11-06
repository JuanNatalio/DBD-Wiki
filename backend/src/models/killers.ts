import mongoose, { Schema } from "mongoose";

export interface KillerAttributes {
  id: number;
  name: string;
  real_name: string;
  release_date: string;
  dlc: string;
  map: string;
  image: string;
  power: {
    name: string;
    description: string;
  };
  perks: string[];
  description: string;
}

const KillerSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  real_name: {
    type: String,
    required: true,
    unique: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  dlc: {
    type: String,
    required: true,
  },
  map: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  power: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  perks: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Killer = mongoose.model<KillerAttributes>("Killer", KillerSchema);

export default Killer;
