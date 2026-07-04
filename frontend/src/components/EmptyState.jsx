import { SearchX } from "lucide-react";

function EmptyState() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-12 text-center">

      <SearchX
        size={70}
        className="mx-auto text-gray-400"
      />

      <h2 className="text-3xl font-bold mt-6 text-gray-800">
        No Research Papers Found
      </h2>

      <p className="mt-4 text-gray-600 text-lg">
        Try another keyword or use broader search terms.
      </p>

    </div>
  );
}

export default EmptyState;