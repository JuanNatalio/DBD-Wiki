import { config } from "../config";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(config.mongoDB_uri || "");
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Connection Error: ", error);
  }
};
