import { Container, Loader, Stack, Text } from "@mantine/core";

const AuthLoading = () => {
  return (
    <Container mt="xl">
      <Stack align="center" gap="md">
        <Loader size="lg" aria-label="Loading authentication" />
        <Text>Checking authentication...</Text>
      </Stack>
    </Container>
  );
};

export default AuthLoading;
