import { useAuth0 } from "@auth0/auth0-react";
import { useUserProfile } from "../hooks/useUser";
import {
  Container,
  Card,
  Loader,
  Alert,
  Grid,
  Stack,
  Title,
  Text,
  Button,
  Group,
} from "@mantine/core";
import { Link } from "react-router-dom";
import NotAuthenticated from "../components/loadingOrErrors/NotAuthenticated";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";

export const Profile = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth0();
  const { data: userProfile, isLoading, error } = useUserProfile();

  if (authLoading) return <AuthLoading />;

  if (!isAuthenticated) {
    return <NotAuthenticated />;
  }

  if (isLoading) {
    return (
      <Container mt="xl" ta="center">
        <Stack align="center" gap="md">
          <Loader size="lg" aria-label="Loading profile" />
          <Text>Loading your profile...</Text>
        </Stack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container mt="xl">
        <Alert color="red" title="Error Loading Profile">
          <Text>{error.message}</Text>
          <Text size="sm" c="dimmed" mt="xs">
            This usually means your account needs to be synced. Please refresh
            the page.
          </Text>
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" mt="xl">
      <Title order={1} mb="lg" fw={700}>
        User Profile
      </Title>

      <Card mb="lg" shadow="lg" padding="lg" radius="md">
        <Grid align="center">
          <Grid.Col span={{ base: 12, md: 3 }} ta="center">
            {user?.picture && (
              <img
                src={user.picture}
                alt="Profile"
                className="img-fluid rounded-circle shadow"
                style={{ maxWidth: "150px" }}
              />
            )}
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 9 }}>
            <Title order={2} fw={700} mb="xs">
              {user?.name || "Unknown User"}
            </Title>
            <Text c="dimmed" mb="md">
              {user?.email}
            </Text>
            <Text mb="xs">
              <Text component="span" c="dimmed">
                Member since:{" "}
              </Text>
              <Text component="span" fw={700}>
                {userProfile?.createdAt
                  ? new Date(userProfile.createdAt).toLocaleDateString()
                  : "Unknown"}
              </Text>
            </Text>
          </Grid.Col>
        </Grid>
      </Card>

      <Card shadow="lg" padding="lg" radius="md">
        <Title order={3} mb="lg" fw={700}>
          Favorites Summary
        </Title>
        <Grid mb="lg" ta="center">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder shadow="sm" padding="lg">
              <Title order={5} c="dimmed" mb="md">
                Favorite Killers
              </Title>
              <Text size="4rem" fw={700} c="red" lh={1}>
                {userProfile?.favoriteKillers.length || 0}
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Card withBorder shadow="sm" padding="lg">
              <Title order={5} c="dimmed" mb="md">
                Favorite Survivors
              </Title>
              <Text size="4rem" fw={700} c="blue" lh={1}>
                {userProfile?.favoriteSurvivors.length || 0}
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
        <Group justify="center">
          <Button component={Link} to="/favorites" size="lg">
            View My Favorites
          </Button>
        </Group>
      </Card>
    </Container>
  );
};

export default Profile;
