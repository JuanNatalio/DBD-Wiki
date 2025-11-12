import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "./useApi";

/**
 * TypeScript interfaces matching your backend models
 */
export interface UserProfile {
  auth0Id: string;
  name?: string;
  email?: string;
  picture?: string;
  favoriteKillers: number[];
  favoriteSurvivors: number[];
  createdAt: string;
  updatedAt: string;
}

export interface Killer {
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

export interface Survivor {
  id: number;
  name: string;
  release_date: string;
  dlc: string;
  map: string;
  perks: string[];
  description: string;
  image: string;
}

export interface FavoritesResponse {
  favoriteKillers: Killer[];
  favoriteSurvivors: Survivor[];
}

/**
 * HOOK: useUserProfile
 *
 * Fetches the current user's profile from /api/users/me
 *
 * Features:
 * - Automatic caching (won't refetch unnecessarily)
 * - Loading and error states built-in
 * - Automatic retry on failure
 *
 * Usage:
 * const { data, isLoading, error } = useUserProfile();
 */
export const useUserProfile = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["userProfile"], // Unique key for this query
    queryFn: () => api<UserProfile>("/api/users/me"),
    // Only fetch if user is authenticated (handled by useApi)
  });
};

/**
 * HOOK: useFavorites
 *
 * Fetches full details of user's favorite killers and survivors
 *
 * Usage:
 * const { data, isLoading } = useFavorites();
 * // data.favoriteKillers = array of full killer objects
 * // data.favoriteSurvivors = array of full survivor objects
 */
export const useFavorites = () => {
  const api = useApi();

  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => api<FavoritesResponse>("/api/users/favorites"),
  });
};

/**
 * HOOK: useAddFavoriteKiller
 *
 * Mutation hook to add a killer to favorites
 *
 * Features:
 * - Optimistic updates (UI updates immediately)
 * - Automatic cache invalidation (refetches user profile after success)
 * - Error handling with rollback
 *
 * Usage:
 * const addKiller = useAddFavoriteKiller();
 *
 * <button onClick={() => addKiller.mutate(1)}>
 *   Add Trapper
 * </button>
 *
 * {addKiller.isLoading && <span>Adding...</span>}
 * {addKiller.error && <span>Error: {addKiller.error.message}</span>}
 */
export const useAddFavoriteKiller = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (killerId: number) =>
      api(`/api/users/favorites/killers/${killerId}`, { method: "POST" }),

    // After success, invalidate queries to refetch updated data
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

/**
 * HOOK: useRemoveFavoriteKiller
 *
 * Mutation hook to remove a killer from favorites
 *
 * Usage:
 * const removeKiller = useRemoveFavoriteKiller();
 * removeKiller.mutate(1); // Remove killer with id 1
 */
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

/**
 * HOOK: useAddFavoriteSurvivor
 *
 * Mutation hook to add a survivor to favorites
 */
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

/**
 * HOOK: useRemoveFavoriteSurvivor
 *
 * Mutation hook to remove a survivor from favorites
 */
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

/**
 * HOOK: useSyncUser
 *
 * Mutation hook to sync user from Auth0 to MongoDB
 * Call this after user logs in to ensure they exist in your database
 *
 * Usage:
 * const syncUser = useSyncUser();
 *
 * useEffect(() => {
 *   if (isAuthenticated) {
 *     syncUser.mutate();
 *   }
 * }, [isAuthenticated]);
 */
export const useSyncUser = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api<UserProfile>("/api/users/upload", { method: "POST" }),

    onSuccess: () => {
      // Invalidate user profile to refetch with new data
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
