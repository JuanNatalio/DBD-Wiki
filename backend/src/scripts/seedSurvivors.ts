import path from "node:path";
import fs from "node:fs";
import { connectDB } from "../mongoose/connectDB";
import Survivor from "../models/survivorsModel";
import { SurvivorAttributes } from "../types/types";

const seedSurvivors = async (reset: boolean) => {
  await connectDB();

  const file = path.resolve(__dirname, "../data/survivors.json");
  const rawData = fs.readFileSync(file, "utf8");
  const data = JSON.parse(rawData);

  if (!Array.isArray(data.survivors)) {
    console.error("Unexpected JSON structure: missing survivors[]");
    process.exit(1);
  }

  if (reset) {
    console.log("Reset flag detected — dropping survivors collection...");
    try {
      await Survivor.collection.drop();
      console.log("Collection dropped");
    } catch (err: any) {
      if (err && (err.codeName === "NameSpaceNotFound" || err.code === 26)) {
        console.log("Collection did not exist");
      } else {
        console.error("Drop Error", err);
        process.exit(1);
      }
    }
  }

  const ops = data.survivors.map((survivor: SurvivorAttributes) => ({
    updateOne: {
      filter: { id: survivor.id },
      update: { $set: survivor },
      upsert: true,
    },
  }));

  try {
    const result = await Survivor.bulkWrite(ops);
    console.log("bulkWrite finished. summary:");
    console.log({
      inserted: (result as any).upsertedCount ?? (result as any).nUpserted ?? 0,
      modified: (result as any).modifiedCount ?? (result as any).nModified ?? 0,
      matched: (result as any).matchedCount ?? (result as any).nMatched ?? 0,
    });
    console.log("Seed completed.");
  } catch (err) {
    console.error("Seeding error: ", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

const resetFlag = process.argv.includes("--reset");
seedSurvivors(resetFlag).catch((e) => {
  console.error(e);
  process.exit(1);
});
