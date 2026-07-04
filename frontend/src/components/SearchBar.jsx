import { Search } from "lucide-react";

function SearchBar({
  query,
  setQuery,
  onSearch,
  onFocus,
  onBlur,
}) {
  return (
    <div className="flex bg-white rounded-xl shadow-xl overflow-hidden">
      <input
        type="text"
        placeholder="Search AI research papers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch();
          }
        }}
        className="flex-1 px-5 py-4 text-gray-800 placeholder-gray-400 focus:outline-none"
      />

      <button
        onClick={onSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 flex items-center gap-2 transition"
      >
        <Search size={18} />
        Search
      </button>
    </div>
  );
}

export default SearchBar;