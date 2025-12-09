import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Grid, Title, Text } from "@mantine/core";
import { Button } from "@mantine/core";

const OfficialResourcesCard = () => {
  return (
    <Card shadow="lg" padding="xl" radius="md" mb="lg">
      <Title order={2} mb="md">
        Official Resources
      </Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder h="100%">
            <Title order={5} mb="xs">
              <FontAwesomeIcon
                icon={["fab", "steam"]}
                style={{ marginRight: "8px" }}
              />
              Official Website
            </Title>
            <Text c="dimmed" mb="md" size="sm">
              Visit the official Dead by Daylight website for news, updates, and
              patch notes.
            </Text>
            <Button
              variant="outline"
              size="xs"
              component="a"
              href="https://deadbydaylight.com/"
              target="_blank"
              rel="noopener noreferrer"
              rightSection={
                <FontAwesomeIcon icon="external-link-alt" size="xs" />
              }
            >
              Visit Website
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder h="100%">
            <Title order={5} mb="xs">
              <FontAwesomeIcon icon="book" style={{ marginRight: "8px" }} />
              Official Wiki
            </Title>
            <Text c="dimmed" mb="md" size="sm">
              The community-maintained wiki with detailed game mechanics and
              character information.
            </Text>
            <Button
              variant="outline"
              size="xs"
              component="a"
              href="https://deadbydaylight.fandom.com/wiki/Dead_by_Daylight_Wiki"
              target="_blank"
              rel="noopener noreferrer"
              rightSection={
                <FontAwesomeIcon icon="external-link-alt" size="xs" />
              }
            >
              Visit Wiki
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder h="100%">
            <Title order={5} mb="xs">
              <FontAwesomeIcon
                icon={["fab", "youtube"]}
                style={{
                  marginRight: "8px",
                  color: "var(--mantine-color-red-6)",
                }}
              />
              YouTube Channel
            </Title>
            <Text c="dimmed" mb="md" size="sm">
              Watch gameplay trailers, developer updates, and community
              spotlights.
            </Text>
            <Button
              variant="outline"
              color="red"
              size="xs"
              component="a"
              href="https://www.youtube.com/@DeadbyDaylightBHVR"
              target="_blank"
              rel="noopener noreferrer"
              rightSection={
                <FontAwesomeIcon icon="external-link-alt" size="xs" />
              }
            >
              Watch Videos
            </Button>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder h="100%">
            <Title order={5} mb="xs">
              <FontAwesomeIcon
                icon={["fab", "reddit"]}
                style={{
                  marginRight: "8px",
                  color: "var(--mantine-color-yellow-6)",
                }}
              />
              Reddit Community
            </Title>
            <Text c="dimmed" mb="md" size="sm">
              Join discussions, share clips, and connect with the DBD community
              on Reddit.
            </Text>
            <Button
              variant="outline"
              color="yellow"
              size="xs"
              component="a"
              href="https://www.reddit.com/r/deadbydaylight/"
              target="_blank"
              rel="noopener noreferrer"
              rightSection={
                <FontAwesomeIcon icon="external-link-alt" size="xs" />
              }
            >
              Join Community
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default OfficialResourcesCard;
