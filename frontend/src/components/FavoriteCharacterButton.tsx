import { Button, Loader, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useUserProfile,
  useAddFavoriteKiller,
  useRemoveFavoriteKiller,
  useAddFavoriteSurvivor,
  useRemoveFavoriteSurvivor,
} from "../hooks/useUser";
import type { characterType } from "../types";

interface FavoriteCharacterButtonProps {
  characterId: number;
  characterType: characterType;
}

const FavoriteCharacterButton = ({
  characterId,
  characterType,
}: FavoriteCharacterButtonProps) => {
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const isKiller = characterType === "KILLER";

  const addKiller = useAddFavoriteKiller();
  const removeKiller = useRemoveFavoriteKiller();

  const addSurvivor = useAddFavoriteSurvivor();
  const removeSurvivor = useRemoveFavoriteSurvivor();

  const isFavorited = isKiller
    ? profile?.favoriteKillers.includes(characterId)
    : profile?.favoriteSurvivors.includes(characterId);

  const handleToggle = () => {
    if (isKiller) {
      if (isFavorited) {
        removeKiller.mutate(characterId);
      } else {
        addKiller.mutate(characterId);
      }
    } else {
      if (isFavorited) {
        removeSurvivor.mutate(characterId);
      } else {
        addSurvivor.mutate(characterId);
      }
    }
  };

  const isProcessing = isKiller
    ? profileLoading || addKiller.isPending || removeKiller.isPending
    : profileLoading || addSurvivor.isPending || removeSurvivor.isPending;

  const error = isKiller
    ? addKiller.error || removeKiller.error
    : addSurvivor.error || removeSurvivor.error;

  return (
    <div>
      <Button
        variant={isFavorited ? "filled" : "outline"}
        color={isKiller ? "red" : "blue"}
        onClick={handleToggle}
        disabled={isProcessing}
        size="xs"
        leftSection={
          isProcessing ? (
            <Loader size="xs" />
          ) : (
            <FontAwesomeIcon icon={isFavorited ? "heart-crack" : "heart"} />
          )
        }
      >
        {isProcessing
          ? isFavorited
            ? "Removing..."
            : "Adding..."
          : isFavorited
          ? "Unfavorite"
          : "Favorite"}
      </Button>

      {error && (
        <Text size="xs" c="red" mt="xs">
          Error: {error.message}
        </Text>
      )}
    </div>
  );
};

export default FavoriteCharacterButton;
