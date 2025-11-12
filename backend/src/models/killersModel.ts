import mongoose, { Schema } from "mongoose";
import { KillerAttributes } from "../types/types";

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
  terror_radius: {
    type: String,
    required: true,
  },
  base_movement_speed: {
    type: String,
    required: true,
  },
});

const Killer = mongoose.model<KillerAttributes>("Killer", KillerSchema);

export default Killer;
