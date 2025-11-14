import { Alert, Container } from "react-bootstrap";

const NotAuthenticated = () => {
  return (
    <Container className="mt-5">
      <Alert variant="warning">
        <Alert.Heading>Not Logged In</Alert.Heading>
        <p>Please log in to view your profile.</p>
      </Alert>
    </Container>
  );
};
export default NotAuthenticated;
