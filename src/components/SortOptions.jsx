// components/SortOptions.jsx
function SortOptions({ value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none px-5 py-3 pr-10 text-gray-700 border-2 border-orange-100 rounded-xl bg-white focus:outline-none focus:border-orange-400 focus:shadow-lg transition-all cursor-pointer shadow-sm hover:shadow-md"
      >
        <option value="">🔀 Sort By</option>
        <option value="name-asc">A → Z</option>
        <option value="name-desc">Z → A</option>
        <option value="nutrition-asc">⭐ Healthiest First (A→E)</option>
        <option value="nutrition-desc">⚠️ Less Healthy First (E→A)</option>
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </div>
    </div>
  );
}

export default SortOptions;