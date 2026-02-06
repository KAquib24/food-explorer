import { useState } from "react";
import { useNavigate } from "react-router-dom";

function BarcodeSearch() {
  const [barcode, setBarcode] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!barcode.trim()) return;
    navigate(`/product/${barcode.trim()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="w-full mb-8">
      <div className="relative">
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="🔍 Enter barcode (e.g., 7613034626844)"
          className="w-full px-6 py-4 text-lg border-2 border-emerald-100 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg focus:shadow-2xl focus:border-emerald-400 focus:outline-none transition-all duration-300"
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 active:scale-95 shadow-lg hover:shadow-xl transition-all"
        >
          Scan
        </button>
      </div>
    </div>
  );
}

export default BarcodeSearch;