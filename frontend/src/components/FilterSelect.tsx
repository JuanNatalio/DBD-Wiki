import type { FC } from "react";
import { Form } from "react-bootstrap";
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
      <h4>Sort By</h4>
      <Form.Select
        aria-label="filter select"
        value={filteredValue}
        onChange={(e) => {
          onFilterChange(e.target.value as FilterValues);
        }}
      >
        <option value="earliest">Earliest</option>
        <option value="most-recent">Most recent</option>
      </Form.Select>
    </>
  );
};

export default FilterSelect;
