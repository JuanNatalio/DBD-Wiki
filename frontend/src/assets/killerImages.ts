type ModuleWithDefault = { default: string };

// Eagerly import all images in the Killers folder
const modules = import.meta.glob("./Killers/*.{png,jpg,jpeg,webp}", {
  eager: true,
}) as Record<string, ModuleWithDefault>;

// Build a map: id (as string) -> image URL
const byId: Record<string, string> = {};

Object.entries(modules).forEach(([path, mod]) => {
  const filename = path.split("/").pop() || path;
  const id = filename.replace(/\.[^.]+$/, "");
  byId[id] = mod.default;
});

export function getKillerImageUrlById(id: number): string | undefined {
  return byId[String(id)];
}
