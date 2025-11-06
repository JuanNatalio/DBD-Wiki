import path from "node:path";
import fs from "node:fs";
import { connectDB } from "../mongoose/connectDB";
import Killer from "../models/killers";

const seed = async (reset = false) => {
  await connectDB();

  const file = path.resolve(__dirname, "../data/killers.json");
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);

  if (!Array.isArray(data.killers)) {
    console.error("Unexpected JSON structure: missing killers[]");
    process.exit(1);
  }

  if (reset) {
    console.log("Reset flag detected — dropping killers collection...");
    try {
      await Killer.collection.drop();
      console.log("Collection dropped.");
    } catch (err: any) {
      if (err && (err.codeName === "NamespaceNotFound" || err.code === 26)) {
        console.log("Collection did not exist.");
      } else {
        console.error("Drop error:", err);
        process.exit(1);
      }
    }
  }

  const ops = data.killers.map((k: any) => ({
    updateOne: {
      filter: { id: k.id },
      update: { $set: k },
      upsert: true,
    },
  }));

  try {
    const result = await Killer.bulkWrite(ops);
    console.log("bulkWrite finished. summary:");
    console.log({
      inserted: (result as any).upsertedCount ?? (result as any).nUpserted ?? 0,
      modified: (result as any).modifiedCount ?? (result as any).nModified ?? 0,
      matched: (result as any).matchedCount ?? (result as any).nMatched ?? 0,
    });
    console.log("Seed complete.");
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

const resetFlag = process.argv.includes("--reset");
seed(resetFlag).catch((e) => {
  console.error(e);
  process.exit(1);
});
