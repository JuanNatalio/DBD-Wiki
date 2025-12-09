import { useFavorites } from "../hooks/useUser";
import { Container, Card, Title, Text, Stack } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";
import NotAuthenticated from "../components/loadingOrErrors/NotAuthenticated";
import DataLoading from "../components/loadingOrErrors/DataLoading";
import ErrorWhenFetching from "../components/loadingOrErrors/ErrorWhenFetching";
import FavoritedCharacters from "../components/FavoritedCharacters";

export const Favorites = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const { data, isLoading, error } = useFavorites();

  if (authLoading) return <AuthLoading />;

  if (!isAuthenticated) return <NotAuthenticated />;

  if (isLoading) return <DataLoading />;

  if (error) return <ErrorWhenFetching error={error} />;

  if (!data?.favoriteKillers.length && !data?.favoriteSurvivors.length) {
    return (
      <Container mt="xl" size="xl">
        <Card shadow="lg" padding="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Title order={2}>No Favorites Yet</Title>
            <Text size="lg" c="dimmed">
              Start adding killers and survivors to your favorites!
            </Text>
          </Stack>
        </Card>
      </Container>
    );
  }

  return (
    <Container mt="xl" size="xl">
      <Title order={1} mb="lg">
        My Favorites
      </Title>
      <Stack gap="xl">
        <FavoritedCharacters data={data} characterType="KILLER" />
        <FavoritedCharacters data={data} characterType="SURVIVOR" />
      </Stack>
    </Container>
  );
};

export default Favorites;
