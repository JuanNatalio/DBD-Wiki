import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";
import type { Email, Killer, Survivor } from "../types";
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
  const { get } = useApi();

  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => get<UserProfileInterface>("/api/users/me"),
  });
};

export const useFavorites = () => {
  const { get } = useApi();

  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => get<FavoritesResponseInterface>("/api/users/favorites"),
  });
};

export const useKillers = () => {
  const { get } = useApi();

  return useQuery({
    queryKey: ["killers"],
    queryFn: () => get<KillerInterface[]>("/api/killers"),
  });
};

export const useSurvivors = () => {
  const { get } = useApi();

  return useQuery({
    queryKey: ["survivors"],
    queryFn: () => get<SurvivorInterface[]>("/api/survivors"),
  });
};

export const useAddFavoriteKiller = () => {
  const { post } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (killerId: number) =>
      post(`/api/users/favorites/killers/${killerId}`, {}),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useRemoveFavoriteKiller = () => {
  const { del } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (killerId: number) =>
      del(`/api/users/favorites/killers/${killerId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useAddFavoriteSurvivor = () => {
  const { post } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (survivorId: number) =>
      post(`/api/users/favorites/survivors/${survivorId}`, {}),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useRemoveFavoriteSurvivor = () => {
  const { del } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (survivorId: number) =>
      del(`/api/users/favorites/survivors/${survivorId}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useSyncUser = () => {
  const { post } = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => post<UserProfileInterface>("/api/users/upload", {}),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

export const useSendEmail = () => {
  const { post } = useApi();

  return useMutation({
    mutationFn: (emailData: Email) => post("/api/users/send-email", emailData),
  });
};
