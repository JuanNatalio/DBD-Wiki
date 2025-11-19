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
import type { FilterValues } from "../types";
import SearchBar from "../components/SearchBar";

const KillersPage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();
  const { data: killers, isLoading, error } = useKillers();
  const [filterValue, setFilterValue] = useState<FilterValues>("earliest");
  const [searchedValue, setSearchedValue] = useState<string>("");

  const filteredKillersList = useMemo(() => {
    if (!killers) return [];
    const tempKillerList = [...killers];

    const result = tempKillerList.filter((killer) => {
      const killerName = killer.name.toLowerCase();
      return killerName.includes(searchedValue.toLowerCase());
    });

    if (filterValue === "most-recent") {
      result.reverse();
    }

    return result;
  }, [filterValue, killers, searchedValue]);

  if (authLoading) return <AuthLoading />;
  if (!isAuthenticated) return <NotAuthenticated />;
  if (isLoading) return <DataLoading />;
  if (error) return <ErrorWhenFetching error={error} />;

  console.log(killers);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Killers</h1>
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
        {filteredKillersList.map((killer) => (
          <Col key={killer.id} xs={12} sm={6} md={4} lg={3}>
            <KillerCard killer={killer} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default KillersPage;
