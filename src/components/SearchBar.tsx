import React from "react";
import { TextInput } from "./TextInput";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <TextInput
      label="Search links"
      value=""
      onChange={(e) => onSearch(e.target.value)}
      name="search"
      id="search"
      style={{ width: "100%" }}
    />
  );
};

export default SearchBar;
