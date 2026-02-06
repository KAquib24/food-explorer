import { Link } from "react-router-dom";
import { Star, Leaf, ArrowRight } from "lucide-react";

function ProductCard({ product }) {
  const {
    code,
    product_name,
    image_front_small_url,
    categories,
    ingredients_text,
    nutrition_grade_fr,
  } = product;

  const getNutritionColor = (grade) => {
    const colors = {
      a: "bg-linear-to-br from-emerald-400 to-green-500",
      b: "bg-linear-to-br from-lime-400 to-lime-500",
      c: "bg-linear-to-br from-amber-300 to-yellow-400",
      d: "bg-linear-to-br from-orange-400 to-amber-500",
      e: "bg-linear-to-br from-red-400 to-orange-500",
    };
    return colors[grade] || "bg-linear-to-br from-gray-300 to-gray-400";
  };

  const imageUrl = image_front_small_url || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&auto=format`;

  return (
    <Link
      to={`/product/${code}`}
      className="group relative bg-linear-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-2xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      aria-label={`View ${product_name || 'product'} details`}
    >
      <div className="absolute top-4 right-4 z-10">
        <div className={`w-10 h-10 rounded-full ${getNutritionColor(nutrition_grade_fr)} flex items-center justify-center shadow-lg ring-2 ring-white/80`}>
          <span className="text-white font-extrabold text-sm">
            {nutrition_grade_fr ? nutrition_grade_fr.toUpperCase() : "?"}
          </span>
        </div>
      </div>

      <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200">
        <img
          src={imageUrl}
          alt={product_name || "Product image"}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://via.placeholder.com/300/CCCCCC/FFFFFF?text=${encodeURIComponent(product_name?.slice(0, 20) || 'Product')}`;
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 leading-tight text-lg">
        {product_name || "Unknown Product"}
      </h3>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-linear-to-r from-purple-50 to-indigo-50 text-purple-700 border border-purple-100">
          {categories ? categories.split(",")[0].trim() : "Uncategorized"}
        </span>
        {nutrition_grade_fr === "a" && (
          <div className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-linear-to-r from-emerald-50 to-green-50 text-emerald-700 border border-emerald-100">
            <Leaf className="w-3 h-3" />
            <span>Healthy</span>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
        {ingredients_text
          ? ingredients_text.slice(0, 100) + (ingredients_text.length > 100 ? "..." : "")
          : "Ingredients information not available"}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-gray-500">Barcode</span>
          <span className="text-xs font-mono text-gray-700">
            #{code?.slice(0, 8) || "N/A"}
          </span>
        </div>
        
        <div className="flex items-center gap-1" aria-label="Product rating: 4 out of 5 stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-300 fill-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-200">
          <span className="text-xs font-medium text-emerald-600">View Details</span>
          <ArrowRight className="w-4 h-4 text-emerald-500" />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;