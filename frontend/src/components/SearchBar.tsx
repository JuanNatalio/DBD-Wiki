import type { FC } from "react";
import { TextInput, Title } from "@mantine/core";

interface SearchBarProps {
  searchValue: string;
  onSearchedValueChange: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({
  searchValue,
  onSearchedValueChange,
}) => {
  return (
    <>
      <Title order={4} mb="xs">
        Search
      </Title>
      <TextInput
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => {
          onSearchedValueChange(e.target.value);
        }}
      />
    </>
  );
};

export default SearchBar;
