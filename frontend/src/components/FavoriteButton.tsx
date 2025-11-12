import {
  useAddFavoriteKiller,
  useRemoveFavoriteKiller,
  useUserProfile,
  useAddFavoriteSurvivor,
  useRemoveFavoriteSurvivor,
} from "../hooks/useUser";
import { Button, Spinner } from "react-bootstrap";

/**
 * FavoriteButton Component - Toggle favorite status for a killer
 *
 * This component demonstrates:
 * 1. Reading data with useUserProfile() query
 * 2. Mutating data with useAddFavoriteKiller() and useRemoveFavoriteKiller()
 * 3. Conditional rendering based on favorite status
 * 4. Loading states during mutations
 * 5. Automatic UI updates after mutations succeed
 *
 * Usage:
 * <FavoriteKillerButton killerId={1} />
 */

interface FavoriteKillerButtonProps {
  killerId: number;
}

export const FavoriteKillerButton = ({
  killerId,
}: FavoriteKillerButtonProps) => {
  // Query: Get current user profile to check if killer is favorited
  const { data: profile, isLoading: profileLoading } = useUserProfile();

  // Mutations: Add/remove killer from favorites
  const addKiller = useAddFavoriteKiller();
  const removeKiller = useRemoveFavoriteKiller();

  // Check if this killer is in the user's favorites
  const isFavorited = profile?.favoriteKillers.includes(killerId);

  // Handle button click - toggle favorite status
  const handleToggle = () => {
    if (isFavorited) {
      removeKiller.mutate(killerId);
    } else {
      addKiller.mutate(killerId);
    }
  };

  // Show loading state while profile is loading or mutation is in progress
  const isProcessing =
    profileLoading || addKiller.isPending || removeKiller.isPending;

  // Show error if mutation failed
  const error = addKiller.error || removeKiller.error;

  return (
    <div>
      <Button
        variant={isFavorited ? "success" : "outline-primary"}
        onClick={handleToggle}
        disabled={isProcessing}
        size="sm"
      >
        {isProcessing ? (
          <>
            <Spinner size="sm" animation="border" className="me-2" />
            {isFavorited ? "Removing..." : "Adding..."}
          </>
        ) : (
          <>{isFavorited ? "❤️ Favorited" : "🤍 Add to Favorites"}</>
        )}
      </Button>

      {error && (
        <small className="text-danger d-block mt-1">
          Error: {error.message}
        </small>
      )}
    </div>
  );
};

/**
 * Similar component for survivors
 */
interface FavoriteSurvivorButtonProps {
  survivorId: number;
}

export const FavoriteSurvivorButton = ({
  survivorId,
}: FavoriteSurvivorButtonProps) => {
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const addSurvivor = useAddFavoriteSurvivor();
  const removeSurvivor = useRemoveFavoriteSurvivor();

  const isFavorited = profile?.favoriteSurvivors.includes(survivorId);

  const handleToggle = () => {
    if (isFavorited) {
      removeSurvivor.mutate(survivorId);
    } else {
      addSurvivor.mutate(survivorId);
    }
  };

  const isProcessing =
    profileLoading || addSurvivor.isPending || removeSurvivor.isPending;
  const error = addSurvivor.error || removeSurvivor.error;

  return (
    <div>
      <Button
        variant={isFavorited ? "success" : "outline-primary"}
        onClick={handleToggle}
        disabled={isProcessing}
        size="sm"
      >
        {isProcessing ? (
          <>
            <Spinner size="sm" animation="border" className="me-2" />
            {isFavorited ? "Removing..." : "Adding..."}
          </>
        ) : (
          <>{isFavorited ? "❤️ Favorited" : "🤍 Add to Favorites"}</>
        )}
      </Button>

      {error && (
        <small className="text-danger d-block mt-1">
          Error: {error.message}
        </small>
      )}
    </div>
  );
};

/**
 * EXAMPLE USAGE IN A KILLER CARD:
 *
 * import { FavoriteKillerButton } from "../components/FavoriteButton";
 *
 * const KillerCard = ({ killer }) => {
 *   return (
 *     <Card>
 *       <Card.Img src={killer.image} />
 *       <Card.Body>
 *         <Card.Title>{killer.name}</Card.Title>
 *         <Card.Text>{killer.description}</Card.Text>
 *         <FavoriteKillerButton killerId={killer.id} />
 *       </Card.Body>
 *     </Card>
 *   );
 * };
 *
 *
 * HOW IT WORKS:
 *
 * 1. Component mounts → useUserProfile() fetches user data
 * 2. React Query checks cache - if fresh, use cached data (no API call!)
 * 3. Check if killerId is in profile.favoriteKillers array
 * 4. Button shows "Add" or "Favorited" based on status
 * 5. User clicks button → handleToggle() calls appropriate mutation
 * 6. Mutation sends POST/DELETE request to API
 * 7. Button shows "Adding..." or "Removing..." (isPending = true)
 * 8. API responds successfully
 * 9. Mutation's onSuccess runs → invalidates "userProfile" query
 * 10. useUserProfile() refetches in background
 * 11. New data arrives → isFavorited updates → button changes
 * 12. All automatic - no manual state management! ✨
 *
 *
 * BENEFITS:
 *
 * ✅ Self-contained component (reusable anywhere)
 * ✅ Automatic loading states
 * ✅ Automatic error handling
 * ✅ Automatic UI updates after success
 * ✅ Optimistic updates possible (see REACT_QUERY_GUIDE.md)
 * ✅ Shared cache across all components (efficient!)
 *
 *
 * NOTES:
 *
 * - If user is not authenticated, useUserProfile() will fail
 * - You may want to wrap this in a check:
 *
 *   const { isAuthenticated } = useAuth0();
 *   if (!isAuthenticated) return null;
 *
 * - Or disable the button:
 *   disabled={!isAuthenticated || isProcessing}
 */
