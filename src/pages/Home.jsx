import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";
import { fetchProducts } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm);

  // Reset products when search changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
  }, [debouncedSearch]);

  // Fetch products (safe even if API fails)
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const newProducts = await fetchProducts({
          page,
          search: debouncedSearch,
        });
        setProducts((prev) => [...prev, ...newProducts]);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [page, debouncedSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Food Product Explorer
      </h1>

      {/* Search */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.code} product={product} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
}

export default Home;
