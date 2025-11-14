import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import type { Killer, Survivor } from "../types";
export interface UserProfileInterface {
  auth0Id: string;
  name?: string;
  email?: string;
  picture?: string;
  favoriteKillers: number[];
  favoriteSurvivors: number[];
  createdAt: string;
  updatedAt: string;
}

export interface KillerInterface {
  id: number;
  name: string;
  real_name: string;
  release_date: string;
  dlc: string;
  map: string;
  power: {
    name: string;
    description: string;
  };
  perks: string[];
  description: string;
  image: string;
  terror_radius: string;
  base_movement_speed: string;
}

export interface SurvivorInterface {
  id: number;
  name: string;
  release_date: string;
  dlc: string;
  map: string;
  perks: string[];
  description: string;
  image: string;
}

export interface FavoritesResponseInterface {
  favoriteKillers: Killer[];
  favoriteSurvivors: Survivor[];
}

export const useUserProfile = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => api<UserProfileInterface>("/api/users/me"),
  });
};

export const useFavorites = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => api<FavoritesResponseInterface>("/api/users/favorites"),
  });
};

export const useKillers = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["killers"],
    queryFn: () => api<KillerInterface[]>("/api/killers"),
  });
};

export const useSurvivors = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["survivors"],
    queryFn: () => api<SurvivorInterface[]>("/api/survivors"),
  });
};

export const useAddFavoriteKiller = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (killerId: number) =>
      api(`/api/users/favorites/killers/${killerId}`, { method: "POST" }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useRemoveFavoriteKiller = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (killerId: number) =>
      api(`/api/users/favorites/killers/${killerId}`, { method: "DELETE" }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useAddFavoriteSurvivor = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (survivorId: number) =>
      api(`/api/users/favorites/survivors/${survivorId}`, { method: "POST" }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useRemoveFavoriteSurvivor = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (survivorId: number) =>
      api(`/api/users/favorites/survivors/${survivorId}`, { method: "DELETE" }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useSyncUser = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      api<UserProfileInterface>("/api/users/upload", { method: "POST" }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
