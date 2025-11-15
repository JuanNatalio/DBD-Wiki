import type { FC } from "react";
import { Form } from "react-bootstrap";
import type { Killer } from "../types";

interface FilterSelectProps {
  killerList: Killer[];
}

const FilterSelect: FC<FilterSelectProps> = ({ killerList }) => {
  const handleFilterChange = (filterValue: string) => {
    if (filterValue === "earliest") {
      if (killerList[0].id !== 1) {
        killerList.reverse();
      }
    } else {
      killerList.reverse();
    }
  };

  return (
    <>
      <h4>Sort By</h4>
      <Form.Select
        aria-label="filter select"
        onChange={(e) => {
          handleFilterChange(e.target.value);
        }}
      >
        <option value="earliest">Earliest</option>
        <option value="most recent">Most recent</option>
      </Form.Select>
    </>
  );
};

export default FilterSelect;
