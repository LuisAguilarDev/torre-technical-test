import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

const SearchBar = ({ onSearch }: { onSearch: (value: string) => void }) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  return (
    <div className="flex items-center w-full max-w-3xl mx-auto rounded-full border border-divider bg-background-1 px-4 py-2">
      <FaUser className="text-text-accent mr-2" />
      <input
        type="text"
        placeholder="Conecta por nombre o correo"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-transparent outline-none text-text-primary placeholder-text-accent"
      />
    </div>
  );
};

export default SearchBar;
