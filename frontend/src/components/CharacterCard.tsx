import { Card, Image, Text, Group } from "@mantine/core";
import type { Killer, Survivor, characterType } from "../types";
import type { FC } from "react";
import FavoriteCharacterButton from "./FavoriteCharacterButton";
import { getKillerImageUrlById } from "../assets/killerImages";
import { getSurvivorImageUrlById } from "../assets/survivorImages";
import ViewDetailsButton from "./subcomponents/ViewDetailsButton";
import { useNavigate } from "react-router-dom";

interface CharacterCardProps {
  character: Killer | Survivor;
  characterType: characterType;
}

const CharacterCard: FC<CharacterCardProps> = ({
  character,
  characterType,
}) => {
  const navigate = useNavigate();
  const isKiller = characterType === "KILLER";

  const localSrc = isKiller
    ? getKillerImageUrlById(character.id)
    : getSurvivorImageUrlById(character.id);

  const viewMoreDetails = () => {
    const route = isKiller
      ? `/killer/${character.id}`
      : `/survivor/${character.id}`;
    navigate(route);
  };

  return (
    <Card shadow="lg" padding="lg" radius="md" withBorder w={288} h="100%">
      <Card.Section>
        <Image
          src={localSrc || character.image}
          alt={character.name}
          height={250}
          fit="contain"
          style={{ cursor: "pointer" }}
          onClick={viewMoreDetails}
        />
      </Card.Section>

      <Text fw={700} size="lg" mt="md" mb="xs">
        {character.name}
      </Text>

      <Group mt="auto" gap="sm">
        <FavoriteCharacterButton
          characterId={character.id}
          characterType={characterType}
        />
        <ViewDetailsButton isKiller={isKiller} id={character.id} />
      </Group>
    </Card>
  );
};

export default CharacterCard;
