// components/CategoryFilter.jsx - Fixed version
function CategoryFilter({ value, onChange, categories = [] }) {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="relative">
      <select
        value={value || ""}
        onChange={(e) => {
          const newValue = e.target.value;
          // FIXED: Send empty string instead of null
          onChange(newValue === "" ? "" : newValue);
        }}
        className="appearance-none px-5 py-3 pr-10 text-gray-700 border-2 border-purple-100 rounded-xl bg-white focus:outline-none focus:border-purple-400 focus:shadow-lg transition-all cursor-pointer shadow-sm hover:shadow-md"
      >
        <option value="" className="text-gray-400">
          🌈 All Categories
        </option>
        {safeCategories.map((category) => (
          <option
            key={category}
            value={category}
            className="text-gray-700 py-2"
          >
            {category}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg 
          className="w-5 h-5 text-purple-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 9l-7 7-7-7" 
          />
        </svg>
      </div>
    </div>
  );
}

export default CategoryFilter;