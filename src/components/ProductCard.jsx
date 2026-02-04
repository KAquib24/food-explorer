import React from "react";
import { Link } from "react-router-dom";
// import ".."

const ProductCard = ({ product }) => {
  const {
    product_name,
    image_front_small_url,
    categories,
    ingredients_text,
    nutritions_grade_fr,
    code,
  } = product;

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition">
      <Link to={`/product/${code}`}>
        <img
          src={image_front_small_url || "https://via.placeholder.com/300"}
          alt={product_name || "Product image"}
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      </Link>

      <h3 className="text-sm font-semibold mb-1">
        {product_name || "Unnamed Product"}
      </h3>

      <p className="text-xs text-gray-500 mb-1">
        {categories ? categories.split(",")[0] : "Unknown Category"}
      </p>

      <p className="text-xs text-gray-600 mb-2">
        {ingredients_text
          ? ingredients_text.slice(0, 80) + "..."
          : "Ingredients not available"}
      </p>

      <span
        className={`inline-block px-2 py-1 text-xs font-bold rounded ${
          nutrition_grade_fr === "a"
            ? "bg-green-500 text-white"
            : nutrition_grade_fr === "b"
            ? "bg-lime-500 text-white"
            : nutrition_grade_fr === "c"
            ? "bg-yellow-400 text-black"
            : nutrition_grade_fr === "d"
            ? "bg-orange-500 text-white"
            : nutrition_grade_fr === "e"
            ? "bg-red-500 text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        {nutrition_grade_fr
          ? nutrition_grade_fr.toUpperCase()
          : "N/A"}
      </span>
    </div>
  );
};

export default ProductCard;
