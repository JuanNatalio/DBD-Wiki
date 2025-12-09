import { Alert, Container } from "@mantine/core";

const NotAuthenticated = () => {
  return (
    <Container mt="xl">
      <Alert variant="light" color="yellow" title="Not Logged In">
        Please log in
      </Alert>
    </Container>
  );
};
export default NotAuthenticated;
