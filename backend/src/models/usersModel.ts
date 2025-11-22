import mongoose, { Schema } from "mongoose";
import { UserAttributes } from "../types/types";

const UserSchema = new Schema(
  {
    auth0Id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
      sparse: true,
    },
    picture: {
      type: String,
    },
    favoriteKillers: {
      type: [Number],
      default: [],
    },
    favoriteSurvivors: {
      type: [Number],
      default: [],
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserAttributes>("Users", UserSchema);
export default User;
