// components/SkeletonLoader.jsx
function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-linear-to-br from-gray-100 to-gray-200 rounded-2xl p-4">
            <div className="h-48 bg-gray-300 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-300 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 rounded mb-3 w-2/3"></div>
            <div className="h-2 bg-gray-300 rounded mb-1"></div>
            <div className="h-2 bg-gray-300 rounded w-4/5"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonLoader;