import express from "express";
import { config } from "./config";
import { connectDB } from "./mongoose/connectDB";
import killersRouter from "./routes/killerRoutes";
import survivorRouter from "./routes/survivorRoutes";
import cors from "cors";
import userRouter from "./routes/userRoutes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/killers", killersRouter);
app.use("/api/survivors", survivorRouter);
app.use("/api/users", userRouter);

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
});
