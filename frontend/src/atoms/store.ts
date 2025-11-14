import { atom } from "jotai";
import type { Survivor, Killer } from "../types";

export const killersAtom = atom<Killer[]>([]);
export const survivorAtom = atom<Survivor[]>([]);
export const favoriteKillers = atom<number[]>([]);
export const favoriteSurvivors = atom<number[]>([]);
