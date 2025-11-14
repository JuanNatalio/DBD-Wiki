import { useAuth0 } from "@auth0/auth0-react";
import { useSurvivors } from "../hooks/useUser";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";
import NotAuthenticated from "../components/loadingOrErrors/NotAuthenticated";
import DataLoading from "../components/loadingOrErrors/DataLoading";
import ErrorWhenFetching from "../components/loadingOrErrors/ErrorWhenFetching";
import { Col, Container, Row } from "react-bootstrap";
import SurvivorCard from "../components/survivorComponents/SurvivorCard";

const SurvivorsPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const { data: survivors, isLoading, error } = useSurvivors();

  if (authLoading) return <AuthLoading />;
  if (!isAuthenticated) return <NotAuthenticated />;
  if (isLoading) return <DataLoading />;
  if (error) return <ErrorWhenFetching error={error} />;

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Survivors</h1>
      <Row className="g-4">
        {(survivors ?? []).map((survivor) => (
          <Col key={survivor.id} xs={12} sm={6} md={4} lg={3}>
            <SurvivorCard survivor={survivor} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SurvivorsPage;
