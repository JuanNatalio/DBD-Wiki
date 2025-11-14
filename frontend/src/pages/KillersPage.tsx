import { useAuth0 } from "@auth0/auth0-react";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";
import NotAuthenticated from "../components/loadingOrErrors/NotAuthenticated";
import { useKillers } from "../hooks/useUser";
import DataLoading from "../components/loadingOrErrors/DataLoading";
import ErrorWhenFetching from "../components/loadingOrErrors/ErrorWhenFetching";
import KillerCard from "../components/killerComponents/KillerCard";
import { Container, Row, Col } from "react-bootstrap";

const KillersPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const { data: killers, isLoading, error } = useKillers();

  if (authLoading) return <AuthLoading />;
  if (!isAuthenticated) return <NotAuthenticated />;
  if (isLoading) return <DataLoading />;
  if (error) return <ErrorWhenFetching error={error} />;

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Killers</h1>
      <Row className="g-4">
        {(killers ?? []).map((killer) => (
          <Col key={killer.id} xs={12} sm={6} md={4} lg={3}>
            <KillerCard killer={killer} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default KillersPage;
