import { Container, Spinner } from "react-bootstrap";

const AuthLoading = () => {
  return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" aria-label="Loading authentication" />
      <p className="mt-3">Checking authentication...</p>
    </Container>
  );
};

export default AuthLoading;
