import type { FC } from "react";
import { Select, Title } from "@mantine/core";
import type { FilterValues } from "../types";

interface FilterSelectProps {
  filteredValue: FilterValues;
  onFilterChange: (value: FilterValues) => void;
}

const FilterSelect: FC<FilterSelectProps> = ({
  filteredValue,
  onFilterChange,
}) => {
  return (
    <>
      <Title order={4} mb="xs">
        Sort By
      </Title>
      <Select
        aria-label="filter select"
        value={filteredValue}
        onChange={(value) => {
          if (value) onFilterChange(value as FilterValues);
        }}
        data={[
          { value: "earliest", label: "Earliest" },
          { value: "most-recent", label: "Most recent" },
        ]}
      />
    </>
  );
};

export default FilterSelect;
