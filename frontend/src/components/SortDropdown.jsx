function SortDropdown({ sortBy, setSortBy }) {
  return (
    <div className="flex items-center gap-3">
      <label className="font-medium text-gray-700">
        Sort By
      </label>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded-lg px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="similarity">
          Highest Similarity
        </option>

        <option value="newest">
          Newest First
        </option>

        <option value="oldest">
          Oldest First
        </option>

        <option value="title">
          Title (A-Z)
        </option>
      </select>
    </div>
  );
}

export default SortDropdown;