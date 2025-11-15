import { useAuth0 } from "@auth0/auth0-react";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";
import NotAuthenticated from "../components/loadingOrErrors/NotAuthenticated";
import { useKillers } from "../hooks/useUser";
import DataLoading from "../components/loadingOrErrors/DataLoading";
import ErrorWhenFetching from "../components/loadingOrErrors/ErrorWhenFetching";
import KillerCard from "../components/killerComponents/KillerCard";
import { Container, Row, Col } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import { useMemo, useState } from "react";

const KillersPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const { data: killers, isLoading, error } = useKillers();
  const [sortOrder, setSortOrder] = useState<string>("earliest");

  const sortedKillers = useMemo(() => {
    if (!killers) return [];
    const sorted = [...killers];
    if (sortOrder === "earliest") {
      return sorted.sort((a, b) => a.id - b.id);
    } else {
      return sorted.sort((a, b) => b.id - a.id);
    }
  }, [killers, sortOrder]);

  if (authLoading) return <AuthLoading />;
  if (!isAuthenticated) return <NotAuthenticated />;
  if (isLoading) return <DataLoading />;
  if (error) return <ErrorWhenFetching error={error} />;

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Killers</h1>
      <Row className="align-items-center mb-4">
        <Col xs="auto" className="ms-auto" style={{ width: 320 }}>
          <FilterSelect value={sortOrder} onChange={setSortOrder} />
        </Col>
      </Row>
      <Row className="g-4">
        {sortedKillers.map((killer) => (
          <Col key={killer.id} xs={12} sm={6} md={4} lg={3}>
            <KillerCard killer={killer} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default KillersPage;
