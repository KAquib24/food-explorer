import { useEffect, useState, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import BarcodeSearch from "../components/BarcodeSearch";
import CategoryFilter from "../components/CategoryFilter";
import SortOptions from "../components/SortOptions";
import useDebounce from "../hooks/useDebounce";
import { fetchProducts, fetchCategories } from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Fetch available categories from API
  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      try {
        const categories = await fetchCategories();
        setAvailableCategories(categories);
      } catch (error) {
        console.error("Failed to load categories:", error);
        setAvailableCategories([
          "Beverages",
          "Snacks",
          "Dairy",
          "Breakfasts",
          "Frozen foods",
          "Organic",
          "Gluten-free",
          "Vegetarian",
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  // Reset when filters change
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    setInitialLoading(true);
  }, [debouncedSearch, category]);

  // Fetch products
  useEffect(() => {
    const loadProducts = async () => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const newProducts = await fetchProducts({
          page,
          search: debouncedSearch,
          category,
        });

        if (newProducts.length === 0) {
          setHasMore(false);
        } else {
          setProducts((prev) => {
            // Remove duplicates
            const existingCodes = new Set(prev.map(p => p.code));
            const uniqueNew = newProducts.filter(p => !existingCodes.has(p.code));
            return [...prev, ...uniqueNew];
          });
        }
      } catch (error) {
        console.error("Failed to load products", error);
        setHasMore(false);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    loadProducts();
  }, [page, debouncedSearch, category]);

  // Sort products
  const sortProducts = useCallback((items) => {
    if (!sortOption) return items;

    const sorted = [...items];
    switch (sortOption) {
      case "name-asc":
        return sorted.sort((a, b) =>
          (a.product_name || "").localeCompare(b.product_name || "")
        );
      case "name-desc":
        return sorted.sort((a, b) =>
          (b.product_name || "").localeCompare(a.product_name || "")
        );
      case "nutrition-asc":
        // A (best) to E (worst)
        return sorted.sort((a, b) => {
          const gradeA = a.nutrition_grade_fr || "z";
          const gradeB = b.nutrition_grade_fr || "z";
          return gradeA.localeCompare(gradeB);
        });
      case "nutrition-desc":
        // E (worst) to A (best)
        return sorted.sort((a, b) => {
          const gradeA = a.nutrition_grade_fr || "";
          const gradeB = b.nutrition_grade_fr || "";
          return gradeB.localeCompare(gradeA);
        });
      default:
        return items;
    }
  }, [sortOption]);

  const displayedProducts = sortProducts(products);

  // Clear all filters
  const handleClearAll = () => {
    setSearchTerm("");
    setCategory("");
    setSortOption("");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-linear-to-r from-emerald-500 to-teal-600 rounded-xl">
                <span className="text-2xl text-white">✨</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-gray-800 to-emerald-700 bg-clip-text text-transparent">
                Nourish Explorer
              </h1>
            </div>
            <p className="text-gray-600">
              Discover, compare, and choose healthier foods
            </p>
          </div>
          <div className="flex items-center gap-4">
            {!initialLoading && (
              <div className="hidden lg:flex items-center gap-2 text-sm text-gray-500">
                <span>🔍</span>
                <span>{products.length} products</span>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="space-y-8 mb-12">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <BarcodeSearch />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-gray-700">Filters:</span>
            
            {/* Category Filter */}
            {loadingCategories ? (
              <div className="px-5 py-3 border-2 border-gray-100 rounded-xl bg-gray-50 animate-pulse min-w-50">
                <span className="text-gray-400">Loading categories...</span>
              </div>
            ) : (
              <CategoryFilter
                value={category}
                onChange={setCategory}
                categories={availableCategories}
              />
            )}
            
            <SortOptions
              value={sortOption}
              onChange={setSortOption}
            />
          </div>
          
          <button
            onClick={handleClearAll}
            disabled={!searchTerm && !category && !sortOption}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear all
          </button>
        </div>

        {/* Active filters indicator */}
        {(searchTerm || category || sortOption) && (
          <div className="mb-6 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-100 text-blue-800 rounded-full">
                  🔍 "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    aria-label="Remove search filter"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {category && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-purple-100 text-purple-800 rounded-full">
                  🏷️ {category}
                  <button
                    onClick={() => setCategory("")}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                    aria-label="Remove category filter"
                  >
                    ×
                  </button>
                </span>
              )}
              
              {sortOption && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-amber-100 text-amber-800 rounded-full">
                  {sortOption === "name-asc" && "A → Z"}
                  {sortOption === "name-desc" && "Z → A"}
                  {sortOption === "nutrition-asc" && "⭐ Healthiest First"}
                  {sortOption === "nutrition-desc" && "⚠️ Less Healthy First"}
                  <button
                    onClick={() => setSortOption("")}
                    className="ml-1 text-amber-600 hover:text-amber-800"
                    aria-label="Remove sort filter"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {initialLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading delicious discoveries...</p>
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl">🍕</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm || category 
                ? "Try adjusting your search or filter to find what you're looking for."
                : "No products available. Please try again later."}
            </p>
            {(searchTerm || category) && (
              <button
                onClick={handleClearAll}
                className="mt-4 px-6 py-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.code} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-16">
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={loading}
                  className="px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 active:scale-95 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      Load More Products
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* End of Results */}
        {!hasMore && products.length > 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-6 bg-linear-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎉</span>
            </div>
            <p className="text-gray-600">
              Found {products.length} product{products.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
              {category && ` in "${category}"`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;