import { useAuth0 } from "@auth0/auth0-react";
import AuthLoading from "../components/loadingOrErrors/AuthLoading";
import NotAuthenticated from "../components/loadingOrErrors/NotAuthenticated";
import { useKillers } from "../hooks/useUser";
import DataLoading from "../components/loadingOrErrors/DataLoading";
import ErrorWhenFetching from "../components/loadingOrErrors/ErrorWhenFetching";
import CharacterCard from "../components/CharacterCard";
import { Container, SimpleGrid, Group, Title } from "@mantine/core";
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
    <Container mt="lg" size="xl">
      <Title order={1} mb="lg">
        Killers
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
        {filteredKillersList.map((killer) => (
          <CharacterCard
            key={killer.id}
            character={killer}
            characterType="KILLER"
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};
export default KillersPage;
