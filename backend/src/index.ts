import express from "express";
import { config } from "./config";
import { connectDB } from "./mongoose/connectDB";
import killersRouter from "./routes/killer";
import survivorRouter from "./routes/survivor";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Hello from the backend! 🚀</h1>");
});

// Mount simplified killers routes
app.use("/api/killers", killersRouter);
app.use("/api/survivors", survivorRouter);

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
});
