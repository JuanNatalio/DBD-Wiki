import type { FC } from "react";
import {
  useRemoveFavoriteKiller,
  useRemoveFavoriteSurvivor,
  type FavoritesResponseInterface,
} from "../hooks/useUser";
import {
  Badge,
  Alert,
  SimpleGrid,
  Card,
  Button,
  Image,
  Text,
  Title,
  Group,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Killer, Survivor, characterType } from "../types";
import { getKillerImageUrlById } from "../assets/killerImages";
import { getSurvivorImageUrlById } from "../assets/survivorImages";

interface FavoritedCharactersProps {
  data: FavoritesResponseInterface | undefined;
  characterType: characterType;
}

const FavoritedCharacters: FC<FavoritedCharactersProps> = ({
  data,
  characterType,
}) => {
  const isKiller = characterType === "KILLER";
  const removeKiller = useRemoveFavoriteKiller();
  const removeSurvivor = useRemoveFavoriteSurvivor();

  const characters = isKiller
    ? data?.favoriteKillers ?? []
    : data?.favoriteSurvivors ?? [];

  const removeMutation = isKiller ? removeKiller : removeSurvivor;
  const color = isKiller ? "red" : "blue";
  const title = isKiller ? "Favorite Killers" : "Favorite Survivors";
  const emptyMessage = isKiller
    ? "No favorite killers yet."
    : "No favorite survivors yet.";

  return (
    <>
      <Group mb="md">
        <Title order={2}>{title}</Title>
        <Badge color={color} size="lg">
          {characters.length}
        </Badge>
      </Group>

      {characters.length === 0 ? (
        <Alert color="blue">{emptyMessage}</Alert>
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
          {characters.map((character: Killer | Survivor) => {
            const localSrc = isKiller
              ? getKillerImageUrlById(character.id)
              : getSurvivorImageUrlById(character.id);

            return (
              <Card
                key={character.id}
                shadow="lg"
                padding="lg"
                radius="md"
                withBorder
                h="100%"
              >
                {character.image && (
                  <Card.Section>
                    <Image
                      src={localSrc || character.image}
                      alt={character.name}
                      height={250}
                      fit="contain"
                    />
                  </Card.Section>
                )}
                <Text fw={700} size="lg" mt="md">
                  {character.name}
                </Text>

                {isKiller && "real_name" in character && (
                  <Text size="sm" c="dimmed" mb="sm">
                    {character.real_name}
                  </Text>
                )}

                <Text size="sm" mb="md">
                  {isKiller && "power" in character && (
                    <>
                      <strong>Power:</strong> {character.power.name}
                      <br />
                    </>
                  )}
                  <strong>DLC:</strong> {character.dlc}
                  {!isKiller && (
                    <>
                      <br />
                      <strong>Released:</strong>{" "}
                      {new Date(character.release_date).toLocaleDateString()}
                    </>
                  )}
                </Text>

                <Button
                  color={color}
                  size="xs"
                  onClick={() => removeMutation.mutate(character.id)}
                  disabled={removeMutation.isPending}
                  loading={removeMutation.isPending}
                  leftSection={
                    !removeMutation.isPending && (
                      <FontAwesomeIcon icon="heart-crack" />
                    )
                  }
                  mt="auto"
                >
                  {removeMutation.isPending ? "Removing..." : "Unfavorite"}
                </Button>
              </Card>
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
};

export default FavoritedCharacters;
