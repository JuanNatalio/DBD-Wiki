import { Card, Title, Text, Group, Badge } from "@mantine/core";

const AboutThisProjectCard = () => {
  return (
    <Card shadow="lg" padding="xl" radius="md" mb="lg" withBorder>
      <Title order={2} mb="lg">
        About This Project
      </Title>
      <Text mb="md">
        This wiki is a <strong>personal project</strong> born out of my passion
        for Dead by Daylight. As an avid player, I wanted to create a
        comprehensive resource where I could easily browse killer and survivor
        information, track my favorites, and have all the game knowledge I need
        in one place.
      </Text>
      <Text mb="lg">
        Whether you're a seasoned fog veteran or just starting your journey in
        the Entity's realm, I hope this wiki helps you learn more about the
        characters, their perks, and strategies to improve your gameplay!
      </Text>
      <Group gap="xs">
        <Badge color="blue">React</Badge>
        <Badge color="cyan">TypeScript</Badge>
        <Badge color="green">Node.js</Badge>
        <Badge color="yellow">MongoDB</Badge>
        <Badge color="red">Express</Badge>
      </Group>
    </Card>
  );
};
export default AboutThisProjectCard;
