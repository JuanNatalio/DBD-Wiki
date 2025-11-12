import express from "express";
import Survivor from "../models/survivorsModel";

const survivorRouter = express.Router();

survivorRouter.get("/", async (req, res) => {
  try {
    const survivors = await Survivor.find().lean();
    return res.json(survivors);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

survivorRouter.get("/name/:name", async (req, res) => {
  try {
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    const name = req.params.name;

    if (!nameRegex.test(name)) {
      return res.status(400).json({ error: "Invalid name format" });
    }

    const survivor = await Survivor.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    }).lean();

    if (!survivor) return res.status(404).json({ error: "Survivor not found" });
    return res.json(survivor);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

survivorRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const survivor = await Survivor.findOne({ id }).lean();
    if (!survivor) return res.status(404).json({ error: "Survivor not found" });
    return res.json(survivor);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

export default survivorRouter;
