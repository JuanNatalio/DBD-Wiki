import { Card, Title, Text, Stack } from "@mantine/core";

const WelcomeToWikiCard = () => {
  return (
    <Card shadow="lg" padding="xl" radius="md" mb="lg" withBorder>
      <Stack align="center" gap="md">
        <Title order={1} size="3rem" fw={700}>
          Welcome to the DBD Wiki
        </Title>
        <Text size="xl" c="dimmed">
          Your personal Dead by Daylight knowledge base
        </Text>
      </Stack>
    </Card>
  );
};

export default WelcomeToWikiCard;
