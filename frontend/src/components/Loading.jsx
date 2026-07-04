function Loading() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white rounded-2xl shadow-md p-7 animate-pulse"
        >
          {/* Title */}
          <div className="h-7 bg-gray-300 rounded w-3/4 mb-6"></div>

          {/* Authors */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>

          {/* Category */}
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>

          {/* Abstract */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>

          {/* Similarity */}
          <div className="mt-7">
            <div className="h-3 bg-gray-300 rounded-full"></div>
          </div>

          {/* Button */}
          <div className="mt-8 flex justify-end">
            <div className="h-10 w-36 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Loading;