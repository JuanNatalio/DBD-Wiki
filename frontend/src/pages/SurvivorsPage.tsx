import { useAuth0 } from "@auth0/auth0-react";
import { useSurvivors } from "../hooks/useUser";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";
import NotAuthenticated from "../components/loadingOrErrors/NotAuthenticated";
import DataLoading from "../components/loadingOrErrors/DataLoading";
import ErrorWhenFetching from "../components/loadingOrErrors/ErrorWhenFetching";
import { Col, Container, Row } from "react-bootstrap";
import SurvivorCard from "../components/survivorComponents/SurvivorCard";
import type { FilterValues } from "../types";
import { useMemo, useState } from "react";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SearchBar";

const SurvivorsPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const { data: survivors, isLoading, error } = useSurvivors();
  const [filterValue, setFilterValue] = useState<FilterValues>("earliest");
  const [searchedValue, setSearchedValue] = useState<string>("");

  const filteredSuvivorsList = useMemo(() => {
    if (!survivors) return [];
    const tempSurvivorList = [...survivors];

    const result = tempSurvivorList.filter((survivor) => {
      const survivorName = survivor.name.toLowerCase();
      return survivorName.includes(searchedValue.toLowerCase());
    });

    if (filterValue === "most-recent") {
      result.reverse();
    }
    return result;
  }, [filterValue, searchedValue, survivors]);

  if (authLoading) return <AuthLoading />;
  if (!isAuthenticated) return <NotAuthenticated />;
  if (isLoading) return <DataLoading />;
  if (error) return <ErrorWhenFetching error={error} />;

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Survivors</h1>
      <Row className="align-items-end mb-4">
        <Col xs="auto" style={{ width: 320 }}>
          <SearchBar
            searchValue={searchedValue}
            onSearchedValueChange={setSearchedValue}
          />
        </Col>
        <Col xs="auto" className="ms-auto" style={{ width: 320 }}>
          <FilterSelect
            filteredValue={filterValue}
            onFilterChange={setFilterValue}
          />
        </Col>
      </Row>
      <Row className="g-4">
        {(filteredSuvivorsList ?? []).map((survivor) => (
          <Col key={survivor.id} xs={12} sm={6} md={4} lg={3}>
            <SurvivorCard survivor={survivor} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SurvivorsPage;
