import { Container, Loader, Stack, Text } from "@mantine/core";

const DataLoading = () => {
  return (
    <Container mt="xl">
      <Stack align="center" gap="md">
        <Loader size="lg" aria-label="Loading data" />
        <Text>Loading Data...</Text>
      </Stack>
    </Container>
  );
};

export default DataLoading;
