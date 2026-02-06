import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductByBarcode } from "../services/api";
import { ArrowLeft, ShoppingBag, Heart, Share2, AlertCircle, Leaf, Award, Scale } from "lucide-react";

function ProductDetail() {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductByBarcode(barcode);
        if (!data) {
          setError("Product not found in our database");
        } else {
          setProduct(data);
        }
      } catch (err) {
        setError("Unable to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [barcode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Unwrapping product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-linear-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Explorer
          </Link>
        </div>
      </div>
    );
  }

  const nutritionGrade = product.nutrition_grade_fr?.toUpperCase();
  const gradeColors = {
    A: "bg-linear-to-r from-emerald-400 to-green-500",
    B: "bg-linear-to-r from-lime-400 to-lime-500",
    C: "bg-linear-to-r from-amber-300 to-yellow-400",
    D: "bg-linear-to-r from-orange-400 to-amber-500",
    E: "bg-linear-to-r from-red-400 to-orange-500",
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-8 group transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to all products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 mb-3 inline-block">
                    #{barcode}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                    {product.product_name || "Unnamed Product"}
                  </h1>
                </div>
                <div className={`w-16 h-16 rounded-2xl ${gradeColors[nutritionGrade] || "bg-gray-300"} flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-black text-2xl">
                    {nutritionGrade || "?"}
                  </span>
                </div>
              </div>

              <div className="aspect-square rounded-2xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 mb-8">
                <img
                  src={product.image_front_url || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop"}
                  alt={product.product_name}
                  className="w-full h-full object-contain p-8"
                />
              </div>

              <div className="flex items-center gap-4">
                <button className="flex-1 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  Add to Basket
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {product.labels && (
              <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-purple-500" />
                  Certifications & Labels
                </h2>
                <div className="flex flex-wrap gap-3">
                  {product.labels.split(",").map((label, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-linear-to-r from-purple-50 to-indigo-50 text-purple-700 font-medium rounded-lg border border-purple-100"
                    >
                      {label.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Leaf className="w-6 h-6 text-emerald-500" />
                Nutritional Values
                <span className="text-sm font-normal text-gray-500">
                  (per 100g/ml)
                </span>
              </h2>
              
              {product.nutriments ? (
                <div className="space-y-4">
                  <NutritionBar label="Energy" value={product.nutriments["energy-kcal_100g"]} unit="kcal" color="from-orange-400 to-amber-500" />
                  <NutritionBar label="Fat" value={product.nutriments.fat_100g} unit="g" color="from-red-400 to-pink-500" />
                  <NutritionBar label="Carbohydrates" value={product.nutriments.carbohydrates_100g} unit="g" color="from-blue-400 to-indigo-500" />
                  <NutritionBar label="Sugars" value={product.nutriments.sugars_100g} unit="g" color="from-purple-400 to-pink-500" />
                  <NutritionBar label="Proteins" value={product.nutriments.proteins_100g} unit="g" color="from-emerald-400 to-teal-500" />
                  <NutritionBar label="Salt" value={product.nutriments.salt_100g} unit="g" color="from-gray-400 to-slate-500" />
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Nutritional information not available
                </p>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Scale className="w-6 h-6 text-amber-500" />
                Ingredients
              </h2>
              <div className="prose prose-emerald max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.ingredients_text || "Ingredients information not available for this product."}
                </p>
              </div>
            </div>

            {product.categories && (
              <div className="bg-linear-to-r from-emerald-500 to-teal-600 rounded-3xl shadow-xl p-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Product Categories
                </h2>
                <p className="text-emerald-100">
                  {product.categories.split(",").slice(0, 3).join(" • ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NutritionBar({ label, value, unit, color }) {
  const percentage = Math.min((value || 0) * 10, 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-bold text-gray-900">
          {value !== undefined ? `${value} ${unit}` : "N/A"}
        </span>
      </div>
      {value !== undefined && (
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-linear-to-r ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default ProductDetail;