import {
  Container,
  Card,
  Grid,
  Alert,
  Title,
  Text,
  Stack,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginButton from "./subcomponents/LoginButton";

const NotAuthenticatedHomePage = () => {
  return (
    <Container size="md" mt="xl">
      <Card shadow="lg" padding="xl" radius="md">
        <Stack align="center" gap="lg">
          <Stack align="center" gap="xs">
            <Title order={1} ta="center">
              Welcome to the DBD Wiki
            </Title>
            <Text size="lg" c="dimmed" ta="center">
              Your ultimate resource for Dead by Daylight killers and survivors
            </Text>
          </Stack>

          <Alert
            icon={<FontAwesomeIcon icon="info-circle" />}
            title="Authentication Required"
            color="blue"
          >
            To access the full wiki features including killer and survivor
            information, favorites, and detailed stats, please log in with your
            account.
          </Alert>

          <Stack gap="md" w="100%">
            <Title order={5} ta="center">
              Features Available After Login:
            </Title>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Text>
                  <FontAwesomeIcon
                    icon="users"
                    style={{
                      marginRight: "8px",
                      color: "var(--mantine-color-blue-6)",
                    }}
                  />
                  Browse all survivors and their perks
                </Text>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Text>
                  <FontAwesomeIcon
                    icon="skull-crossbones"
                    style={{
                      marginRight: "8px",
                      color: "var(--mantine-color-red-6)",
                    }}
                  />
                  Explore killers and their powers
                </Text>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Text>
                  <FontAwesomeIcon
                    icon="heart"
                    style={{
                      marginRight: "8px",
                      color: "var(--mantine-color-red-6)",
                    }}
                  />
                  Save your favorite characters
                </Text>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Text>
                  <FontAwesomeIcon
                    icon="search"
                    style={{
                      marginRight: "8px",
                      color: "var(--mantine-color-green-6)",
                    }}
                  />
                  Search and filter characters
                </Text>
              </Grid.Col>
            </Grid>
          </Stack>

          <LoginButton />
        </Stack>
      </Card>
    </Container>
  );
};

export default NotAuthenticatedHomePage;
