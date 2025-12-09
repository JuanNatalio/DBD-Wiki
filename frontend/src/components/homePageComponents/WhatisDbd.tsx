import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Grid, Title, Text, Group } from "@mantine/core";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { getKillerImageUrlById } from "../../assets/killerImages";
import { getSurvivorImageUrlById } from "../../assets/survivorImages";

const WhatIsDbdCard = () => {
  const navigate = useNavigate();
  return (
    <Card shadow="lg" padding="xl" radius="md" mb="lg">
      <Title order={2} mb="md">
        What is Dead by Daylight?
      </Title>
      <Text mb="sm">
        <strong>Dead by Daylight</strong> is an asymmetric multiplayer horror
        game developed by Behaviour Interactive. In each match, four survivors
        face off against one powerful killer in a deadly game of cat and mouse.
      </Text>
      <Text mb="sm">
        As a <strong>Survivor</strong>, your goal is to repair generators and
        escape through the exit gates while avoiding the killer. As a{" "}
        <strong>Killer</strong>, you hunt down survivors and sacrifice them to
        the Entity before they can escape.
      </Text>
      <Text mb="md">
        The game features iconic horror characters from franchises like
        Halloween, Stranger Things, Resident Evil, Silent Hill, and many more,
        alongside original characters with unique perks and abilities.
      </Text>

      <Grid mb="md">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Group gap="md">
            <img
              src={getKillerImageUrlById(1) || ""}
              alt="The Trapper"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <div>
              <Text fw={600} mb={4}>
                The Trapper
              </Text>
              <Text size="sm" c="dimmed">
                The game's iconic killer who uses bear traps
              </Text>
            </div>
          </Group>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Group gap="md">
            <img
              src={getSurvivorImageUrlById(1) || ""}
              alt="Dwight Fairfield"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <div>
              <Text fw={600} mb={4}>
                Dwight Fairfield
              </Text>
              <Text size="sm" c="dimmed">
                The nervous leader who unites survivors
              </Text>
            </div>
          </Group>
        </Grid.Col>
      </Grid>

      <Group justify="center" gap="sm">
        <Button
          color="red"
          size="lg"
          onClick={() => navigate("/killers")}
          leftSection={<FontAwesomeIcon icon="skull-crossbones" />}
        >
          Explore Killers
        </Button>
        <Button
          size="lg"
          onClick={() => navigate("/survivors")}
          leftSection={<FontAwesomeIcon icon="users" />}
        >
          Explore Survivors
        </Button>
      </Group>
    </Card>
  );
};

export default WhatIsDbdCard;
