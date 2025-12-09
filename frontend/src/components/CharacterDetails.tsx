import type { FC } from "react";
import { useKillers, useSurvivors } from "../hooks/useUser";
import type { characterType } from "../types";
import DataLoading from "./loadingOrErrors/DataLoading";
import ErrorWhenFetching from "./loadingOrErrors/ErrorWhenFetching";
import { getKillerImageUrlById } from "../assets/killerImages";
import { getSurvivorImageUrlById } from "../assets/survivorImages";
import {
  Container,
  Grid,
  Card,
  List,
  Title,
  Text,
  Group,
  Stack,
  Paper,
} from "@mantine/core";
import FavoriteCharacterButton from "./FavoriteCharacterButton";

interface CharacterDetailsProps {
  characterType: characterType;
  id: number;
}

const CharacterDetails: FC<CharacterDetailsProps> = ({ characterType, id }) => {
  const {
    data: killers,
    isLoading: killerLoading,
    error: killerError,
  } = useKillers();
  const {
    data: survivors,
    isLoading: survivorLoading,
    error: survivorError,
  } = useSurvivors();

  if (characterType === "KILLER") {
    if (killerLoading) return <DataLoading />;
    if (killerError) return <ErrorWhenFetching error={killerError} />;

    const killer = killers?.find((killer) => killer.id === id);
    if (!killer)
      return (
        <Container mt="xl">
          <Title order={3}>Killer not found</Title>
        </Container>
      );

    const localSrc = getKillerImageUrlById(id);

    return (
      <Container size="lg" mt="xl">
        <Card shadow="lg" padding="xl" radius="md" bg="dark" c="white">
          <Paper p="md" withBorder radius="md" bg="gray.9" mb="xl">
            <Grid gutter="lg" align="flex-start">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack align="center" gap="md">
                  <img
                    src={localSrc}
                    alt={killer.name}
                    className="img-fluid rounded shadow"
                    style={{
                      maxHeight: "400px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="md">
                  <Group
                    justify="space-between"
                    align="flex-start"
                    wrap="nowrap"
                  >
                    <Stack gap="xs" style={{ flex: 1 }}>
                      <Title order={1} fw={700}>
                        {killer.name}
                      </Title>
                      <Title order={4} c="dimmed">
                        {killer.real_name}
                      </Title>
                    </Stack>
                    <FavoriteCharacterButton
                      characterId={id}
                      characterType="KILLER"
                    />
                  </Group>
                  <Text size="lg">{killer.description}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>

          <Card.Section withBorder inheritPadding py="md">
            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <Stack gap="xl">
                  <Paper p="md" withBorder radius="md" bg="gray.9">
                    <Title order={4} mb="md">
                      Basic Information
                    </Title>
                    <Stack gap="md">
                      <div>
                        <Title order={6} c="dimmed" mb="xs">
                          Release Date
                        </Title>
                        <Text size="lg">{killer.release_date}</Text>
                      </div>
                      <div>
                        <Title order={6} c="dimmed" mb="xs">
                          Map
                        </Title>
                        <Text size="lg">{killer.map}</Text>
                      </div>
                    </Stack>
                  </Paper>

                  <Paper p="md" withBorder radius="md" bg="gray.9">
                    <Title order={4} mb="md">
                      Statistics
                    </Title>
                    <Stack gap="md">
                      <div>
                        <Title order={6} c="dimmed" mb="xs">
                          Terror Radius
                        </Title>
                        <Text size="lg">{killer.terror_radius}</Text>
                      </div>
                      <div>
                        <Title order={6} c="dimmed" mb="xs">
                          Movement Speed
                        </Title>
                        <Text size="lg">{killer.base_movement_speed}</Text>
                      </div>
                    </Stack>
                  </Paper>
                </Stack>
              </Grid.Col>

              <Grid.Col span={{ base: 12, lg: 6 }}>
                <Stack gap="xl">
                  <Paper p="md" withBorder radius="md" bg="gray.9">
                    <Title order={4} mb="md">
                      Power: {killer.power.name}
                    </Title>
                    <Text>{killer.power.description}</Text>
                  </Paper>

                  <Paper p="md" withBorder radius="md" bg="gray.9">
                    <Title order={4} mb="md">
                      Unique Perks
                    </Title>
                    <List spacing="sm" size="lg">
                      {killer.perks.map((perk, index) => (
                        <List.Item key={index}>
                          <Text fw={700} size="lg">
                            {perk}
                          </Text>
                        </List.Item>
                      ))}
                    </List>
                  </Paper>

                  <Paper p="md" withBorder radius="md" bg="gray.9">
                    <Title order={4} mb="md">
                      DLC Information
                    </Title>
                    <Text size="lg">{killer.dlc}</Text>
                  </Paper>
                </Stack>
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
      </Container>
    );
  } else {
    if (survivorLoading) return <DataLoading />;
    if (survivorError) return <ErrorWhenFetching error={survivorError} />;

    const survivor = survivors?.find((survivor) => survivor.id === id);
    if (!survivor)
      return (
        <Container mt="xl">
          <Title order={3}>Survivor not found</Title>
        </Container>
      );

    const localSrc = getSurvivorImageUrlById(id);

    return (
      <Container size="lg" mt="xl">
        <Card shadow="lg" padding="xl" radius="md" bg="dark" c="white">
          <Paper p="md" withBorder radius="md" bg="gray.9" mb="xl">
            <Grid gutter="lg" align="flex-start">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack align="center" gap="md">
                  <img
                    src={localSrc}
                    alt={survivor.name}
                    className="img-fluid rounded shadow"
                    style={{
                      maxHeight: "400px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="md">
                  <Group
                    justify="space-between"
                    align="flex-start"
                    wrap="nowrap"
                  >
                    <Title order={1} fw={700} style={{ flex: 1 }}>
                      {survivor.name}
                    </Title>
                    <FavoriteCharacterButton
                      characterId={id}
                      characterType="SURVIVOR"
                    />
                  </Group>
                  <Text size="lg">{survivor.description}</Text>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>

          <Card.Section withBorder inheritPadding py="md">
            <Grid gutter="xl">
              <Grid.Col span={{ base: 12, lg: 6 }}>
                <Paper p="md" withBorder radius="md" bg="gray.9">
                  <Title order={4} mb="md">
                    Basic Information
                  </Title>
                  <Stack gap="md">
                    <div>
                      <Title order={6} c="dimmed" mb="xs">
                        Release Date
                      </Title>
                      <Text size="lg">{survivor.release_date}</Text>
                    </div>
                    <div>
                      <Title order={6} c="dimmed" mb="xs">
                        Map
                      </Title>
                      <Text size="lg">{survivor.map}</Text>
                    </div>
                  </Stack>
                </Paper>
              </Grid.Col>

              <Grid.Col span={{ base: 12, lg: 6 }}>
                <Stack gap="xl">
                  <Paper p="md" withBorder radius="md" bg="gray.9">
                    <Title order={4} mb="md">
                      Unique Perks
                    </Title>
                    <List spacing="sm" size="lg">
                      {survivor.perks.map((perk, index) => (
                        <List.Item key={index}>
                          <Text fw={700} size="lg">
                            {perk}
                          </Text>
                        </List.Item>
                      ))}
                    </List>
                  </Paper>

                  <Paper p="md" withBorder radius="md" bg="gray.9">
                    <Title order={4} mb="md">
                      DLC Information
                    </Title>
                    <Text size="lg">{survivor.dlc}</Text>
                  </Paper>
                </Stack>
              </Grid.Col>
            </Grid>
          </Card.Section>
        </Card>
      </Container>
    );
  }
};

export default CharacterDetails;
