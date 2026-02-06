// components/SearchBar.jsx
function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-8">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="🍕 Search for pasta, snacks, beverages..."
          className="w-full px-6 py-4 pl-14 text-lg bg-linear-to-r from-blue-50/50 to-indigo-50/50 border-2 border-blue-100 rounded-2xl shadow-lg focus:shadow-2xl focus:border-blue-400 focus:outline-none transition-all duration-300"
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;