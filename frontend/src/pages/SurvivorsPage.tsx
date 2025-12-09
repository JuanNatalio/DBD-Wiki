import { useAuth0 } from "@auth0/auth0-react";
import { useSurvivors } from "../hooks/useUser";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";
import NotAuthenticated from "../components/loadingOrErrors/NotAuthenticated";
import DataLoading from "../components/loadingOrErrors/DataLoading";
import ErrorWhenFetching from "../components/loadingOrErrors/ErrorWhenFetching";
import { Container, SimpleGrid, Group, Title } from "@mantine/core";
import CharacterCard from "../components/CharacterCard";
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
    <Container mt="lg" size="xl">
      <Title order={1} mb="lg">
        Survivors
      </Title>
      <Group justify="space-between" align="flex-end" mb="lg">
        <div style={{ width: 320 }}>
          <SearchBar
            searchValue={searchedValue}
            onSearchedValueChange={setSearchedValue}
          />
        </div>
        <div style={{ width: 320 }}>
          <FilterSelect
            filteredValue={filterValue}
            onFilterChange={setFilterValue}
          />
        </div>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="lg">
        {(filteredSuvivorsList ?? []).map((survivor) => (
          <CharacterCard
            key={survivor.id}
            character={survivor}
            characterType="SURVIVOR"
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default SurvivorsPage;
