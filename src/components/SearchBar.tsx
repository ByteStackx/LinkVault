type SearchBarProps = {
  onSearch: (query: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <input
      type="text"
      className="search-input"
      placeholder="Search by title, description, tags, or URL..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar