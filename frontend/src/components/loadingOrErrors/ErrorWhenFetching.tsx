import type { FC } from "react";
import { Alert, Container } from "react-bootstrap";

interface ErrorWhenFetchingProps {
  error: Error | null;
}

const ErrorWhenFetching: FC<ErrorWhenFetchingProps> = ({ error }) => {
  return (
    <Container className="mt-5">
      <Alert variant="danger">
        <Alert.Heading>Error Loading Profile</Alert.Heading>
        <p>{error?.message}</p>
        <p className="text-muted">
          <small>There was an error fetching the data.</small>
        </p>
      </Alert>
    </Container>
  );
};

export default ErrorWhenFetching;
