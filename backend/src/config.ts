import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoDB_uri: process.env.MONGODB_URI,
};
