import { Container, Spinner } from "react-bootstrap";

const DataLoading = () => {
  return (
    <Container className="mt-5 text-center">
      <Spinner animation="border" aria-label="Loading data" />
      <p className="mt-3">Loading Data...</p>
    </Container>
  );
};

export default DataLoading;
