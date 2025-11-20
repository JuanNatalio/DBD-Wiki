import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useUserProfile,
  useAddFavoriteSurvivor,
  useRemoveFavoriteSurvivor,
} from "../../hooks/useUser";

interface FavoriteSurvivorButtonProps {
  survivorId: number;
}

const FavoriteSurvivorButton = ({
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
        variant={isFavorited ? "primary" : "outline-primary"}
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

export default FavoriteSurvivorButton;
