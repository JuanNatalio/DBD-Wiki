import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoDB_uri: process.env.MONGODB_URI,
  auth0_domain_name: process.env.AUTH0_DOMAIN_NAME,
  auth0_audience: process.env.AUTH0_AUDIENCE,
};
