import type { ModuleWithDefault } from "./types";

const modules = import.meta.glob("./Survivors/*.{png,jpg,jpeg,webp}", {
  eager: true,
}) as Record<string, ModuleWithDefault>;

const byId: Record<string, string> = {};

Object.entries(modules).forEach(([path, mod]) => {
  const filename = path.split("/").pop() || path;
  const id = filename.replace(/\.[^.]+$/, "");
  byId[id] = mod.default;
});

export function getSurvivorImageUrlById(id: number): string | undefined {
  return byId[String(id)];
}
