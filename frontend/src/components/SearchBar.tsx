import type { FC } from "react";
import { Form } from "react-bootstrap";

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
      <h4>Search</h4>
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => {
          onSearchedValueChange(e.target.value);
        }}
      ></Form.Control>
    </>
  );
};

export default SearchBar;
