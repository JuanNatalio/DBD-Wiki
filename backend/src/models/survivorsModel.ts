import mongoose, { Schema } from "mongoose";
import { SurvivorAttributes } from "../types/types";

const SurvivorSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unqiue: true,
  },
  release_date: {
    type: String,
    required: true,
  },
  dlc: {
    type: String,
    required: true,
  },
  map: { type: String, required: true },
  perks: {
    type: [String],
    required: true,
    unqiue: true,
  },
  description: {
    type: String,
    required: true,
    unqiue: true,
  },
  image: {
    type: String,
    required: true,
    unqiue: true,
  },
});

const Survivor = mongoose.model<SurvivorAttributes>(
  "Survivors",
  SurvivorSchema
);

export default Survivor;
