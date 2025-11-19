import { Button, Spinner } from "react-bootstrap";
import {
  useUserProfile,
  useAddFavoriteKiller,
  useRemoveFavoriteKiller,
} from "../../hooks/useUser";

interface FavoriteKillerButtonProps {
  killerId: number;
}

const FavoriteKillerButton = ({ killerId }: FavoriteKillerButtonProps) => {
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const addKiller = useAddFavoriteKiller();
  const removeKiller = useRemoveFavoriteKiller();

  const isFavorited = profile?.favoriteKillers.includes(killerId);

  const handleToggle = () => {
    if (isFavorited) {
      removeKiller.mutate(killerId);
    } else {
      addKiller.mutate(killerId);
    }
  };

  const isProcessing =
    profileLoading || addKiller.isPending || removeKiller.isPending;

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
          <>{isFavorited ? "Remove From Favorites" : "Add to Favorites"}</>
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

export default FavoriteKillerButton;
