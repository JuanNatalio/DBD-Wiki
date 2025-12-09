import type { FC } from "react";
import { Alert, Container, Text } from "@mantine/core";

interface ErrorWhenFetchingProps {
  error: Error | null;
}

const ErrorWhenFetching: FC<ErrorWhenFetchingProps> = ({ error }) => {
  return (
    <Container mt="xl">
      <Alert variant="light" color="red" title="Error Loading">
        <Text>{error?.message}</Text>
        <Text size="sm" c="dimmed" mt="xs">
          There was an error fetching the data.
        </Text>
      </Alert>
    </Container>
  );
};

export default ErrorWhenFetching;
