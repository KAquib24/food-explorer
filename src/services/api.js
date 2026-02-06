const API_BASE = "https://world.openfoodfacts.org/api/v2";

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchWithCache(url, options = {}) {
  const cacheKey = url + JSON.stringify(options);
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function fetchProducts({ page = 1, search = "", category = "" }) {
  try {
    const pageSize = 24;
    const url = new URL(`${API_BASE}/search`);
    
    const params = {
      json: 1,
      page_size: pageSize,
      page,
      fields: "code,product_name,image_front_small_url,categories,ingredients_text,nutrition_grade_fr,brands",
      sort_by: "unique_scans_n"
    };

    if (search) {
      params.search_terms = search;
    }

    if (category && category.trim() !== "") {
      params.tagtype_0 = "categories";
      params.tag_contains_0 = "contains";
      params.tag_0 = category;
    }

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const data = await fetchWithCache(url.toString());
    
    const products = data.products
      ?.filter(product => 
        product.code && 
        product.product_name && 
        product.image_front_small_url
      )
      .map(product => ({
        ...product,
        image_front_small_url: product.image_front_small_url || 
          `https://via.placeholder.com/300/CCCCCC/FFFFFF?text=${encodeURIComponent(product.product_name?.slice(0, 20) || 'Product')}`
      })) || [];

    return products;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function fetchProductByBarcode(barcode) {
  try {
    const url = `${API_BASE}/product/${barcode}.json?fields=code,product_name,image_front_url,image_front_small_url,categories,ingredients_text,nutrition_grade_fr,nutriments,labels,brands,quantity`;
    
    const data = await fetchWithCache(url);
    
    if (data.status === 0) {
      return null;
    }

    return {
      ...data.product,
      nutriments: data.product.nutriments || {},
      labels: data.product.labels || "",
      categories: data.product.categories || ""
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function fetchCategories() {
  try {
    // First, let's fetch some products to see what categories are actually used
    const sampleUrl = `${API_BASE}/search?page_size=50&fields=categories&sort_by=unique_scans_n`;
    const response = await fetch(sampleUrl);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Extract categories from products
    const categorySet = new Set();
    
    data.products?.forEach(product => {
      if (product.categories) {
        // Split the categories string and add each one
        const categories = product.categories.split(',').map(cat => cat.trim());
        categories.forEach(cat => {
          if (cat && cat.length > 0) {
            categorySet.add(cat);
          }
        });
      }
    });
    
    // Convert to array, sort, and limit
    const categories = Array.from(categorySet)
      .sort((a, b) => a.localeCompare(b))
      .slice(0, 20);
    
    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [
      "Beverages",
      "Snacks",
      "Dairy",
      "Breakfasts",
      "Frozen foods",
      "Organic",
      "Gluten-free",
      "Vegetarian",
      "Chocolate",
      "Cookies",
      "Pasta",
      "Rice",
      "Sauces",
      "Soups",
      "Spices",
      "Tea",
      "Coffee",
      "Juices",
      "Water",
      "Yogurts"
    ];
  }
}