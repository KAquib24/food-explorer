const BASE_URL = "/api";

export const fetchProducts = async ({
  search = "",
  category = "",
  page = 1,
  pageSize = 20,
}) => {
  let url = `${BASE_URL}/cgi/search.pl?search_terms=${encodeURIComponent(
    search || "*"
  )}&json=true&page=${page}&page_size=${pageSize}`;

  if (category) {
    url += `&tagtype_0=categories&tag_contains_0=contains&tag_0=${category}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
