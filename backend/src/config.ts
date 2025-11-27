import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  mongoDB_uri: process.env.MONGODB_URI,
  auth0_domain_name: process.env.AUTH0_DOMAIN_NAME,
  auth0_audience: process.env.AUTH0_AUDIENCE,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  SMTP_RECIPIENT: process.env.SMTP_RECIPIENT,
  frontend_url: process.env.FRONTEND_URL || "http://localhost:5173",
  node_env: process.env.NODE_ENV || "development",
};
