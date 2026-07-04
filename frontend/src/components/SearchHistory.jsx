import { History } from "lucide-react";

function SearchHistory({ history, onSelect }) {
  return (
    <div className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center gap-2">
        <History size={18} className="text-blue-600" />
        <span className="font-semibold text-gray-700">
          Recent Searches
        </span>
      </div>

      {history.map((item, index) => (
        <button
          key={index}
          onMouseDown={() => onSelect(item)}
          className="w-full text-left px-4 py-3 hover:bg-blue-50 transition text-gray-700"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default SearchHistory;