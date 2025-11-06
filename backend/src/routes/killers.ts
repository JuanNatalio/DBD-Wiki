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
