import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        variant={isFavorited ? "danger" : "outline-danger"}
        onClick={handleToggle}
        disabled={isProcessing}
        size="sm"
        className="shadow-sm"
      >
        {isProcessing ? (
          <>
            <Spinner size="sm" animation="border" className="me-1" />
            {isFavorited ? "Removing..." : "Adding..."}
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={isFavorited ? "heart-crack" : "heart"}
              className="me-1"
            />
            {isFavorited ? "Unfavorite" : "Favorite"}
          </>
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
