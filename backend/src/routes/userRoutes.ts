import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import { config } from "../config";
import User from "../models/usersModel";
import Killer from "../models/killersModel";
import Survivor from "../models/survivorsModel";

const userRouter = express.Router();

const checkJwt = auth({
  audience: config.auth0_audience,
  issuerBaseURL: config.auth0_domain_name,
  tokenSigningAlg: "RS256",
});

userRouter.post("/upload", checkJwt, async (req, res) => {
  try {
    const claims = req.auth?.payload;
    if (!claims) return res.status(401).json({ error: "Unauthorized" });

    const auth0Id = claims.sub as string;
    const email = claims.email as string | undefined;
    const name = (claims.name || claims.nickname) as string | undefined;
    const picture = claims.picture as string | undefined;

    const user = await User.findOneAndUpdate(
      { auth0Id },
      { $set: { email, name, picture } },
      { upsert: true, new: true }
    ).lean();

    res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

userRouter.get("/me", checkJwt, async (req: any, res) => {
  try {
    const auth0Id = req.auth?.payload?.sub as string | undefined;
    if (!auth0Id) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findOne({ auth0Id }).lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

userRouter.get("/favorites", checkJwt, async (req: any, res) => {
  try {
    const auth0Id = req.auth?.payload?.sub as string | undefined;
    if (!auth0Id) return res.status(401).json({ error: "Unauthorized" });

    const user = await User.findOne({ auth0Id }).lean();
    if (!user) return res.status(404).json({ error: "User not found" });

    const killers = await Killer.find({
      id: { $in: user.favoriteKillers },
    }).lean();
    const survivors = await Survivor.find({
      id: { $in: user.favoriteSurvivors },
    }).lean();

    res.json({
      favoriteKillers: killers,
      favoriteSurvivors: survivors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

userRouter.post("/favorites/killers/:id", checkJwt, async (req: any, res) => {
  try {
    const auth0Id = req.auth?.payload?.sub as string | undefined;
    if (!auth0Id) return res.status(401).json({ error: "Unauthorized" });

    const killerId = Number(req.params.id);
    if (Number.isNaN(killerId)) {
      return res.status(400).json({ error: "Invalid killer ID" });
    }

    const killer = await Killer.findOne({ id: killerId });
    if (!killer) {
      return res.status(404).json({ error: "Killer not found" });
    }

    const user = await User.findOneAndUpdate(
      { auth0Id },
      { $addToSet: { favoriteKillers: killerId } },
      { new: true }
    ).lean();

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      message: "Killer added to favorites",
      favoriteKillers: user.favoriteKillers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

userRouter.delete("/favorites/killers/:id", checkJwt, async (req: any, res) => {
  try {
    const auth0Id = req.auth?.payload?.sub as string | undefined;
    if (!auth0Id) return res.status(401).json({ error: "Unauthorized" });

    const killerId = Number(req.params.id);
    if (Number.isNaN(killerId)) {
      return res.status(400).json({ error: "Invalid killer ID" });
    }

    const user = await User.findOneAndUpdate(
      { auth0Id },
      { $pull: { favoriteKillers: killerId } },
      { new: true }
    ).lean();

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      message: "Killer removed from favorites",
      favoriteKillers: user.favoriteKillers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

userRouter.post("/favorites/survivors/:id", checkJwt, async (req: any, res) => {
  try {
    const auth0Id = req.auth?.payload?.sub as string | undefined;
    if (!auth0Id) return res.status(401).json({ error: "Unauthorized" });

    const survivorId = Number(req.params.id);
    if (Number.isNaN(survivorId)) {
      return res.status(400).json({ error: "Invalid survivor ID" });
    }

    const survivor = await Survivor.findOne({ id: survivorId });
    if (!survivor) {
      return res.status(404).json({ error: "Survivor not found" });
    }

    const user = await User.findOneAndUpdate(
      { auth0Id },
      { $addToSet: { favoriteSurvivors: survivorId } },
      { new: true }
    ).lean();

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      message: "Survivor added to favorites",
      favoriteSurvivors: user.favoriteSurvivors,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

userRouter.delete(
  "/favorites/survivors/:id",
  checkJwt,
  async (req: any, res) => {
    try {
      const auth0Id = req.auth?.payload?.sub as string | undefined;
      if (!auth0Id) return res.status(401).json({ error: "Unauthorized" });

      const survivorId = Number(req.params.id);
      if (Number.isNaN(survivorId)) {
        return res.status(400).json({ error: "Invalid survivor ID" });
      }

      const user = await User.findOneAndUpdate(
        { auth0Id },
        { $pull: { favoriteSurvivors: survivorId } },
        { new: true }
      ).lean();

      if (!user) return res.status(404).json({ error: "User not found" });

      res.json({
        message: "Survivor removed from favorites",
        favoriteSurvivors: user.favoriteSurvivors,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server Error" });
    }
  }
);

export default userRouter;
