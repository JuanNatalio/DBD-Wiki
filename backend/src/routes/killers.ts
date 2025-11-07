import express from "express";
import Killer from "../models/killers";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const killers = await Killer.find().lean();
    return res.json(killers);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /api/killers/name/:name - Must come BEFORE /:id route
router.get("/name/:name", async (req, res) => {
  try {
    const nameRegex = /^[a-zA-Z0-9\s\-']+$/;
    const name = req.params.name;

    if (!nameRegex.test(name))
      return res.status(400).json({ error: "Invalid name format" });

    // Case-insensitive search
    const killer = await Killer.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    }).lean();

    if (!killer) return res.status(404).json({ error: "Killer not found" });
    return res.json(killer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /api/killers/:id  (numeric id)
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const killer = await Killer.findOne({ id }).lean();
    if (!killer) return res.status(404).json({ error: "Killer not found" });
    return res.json(killer);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
