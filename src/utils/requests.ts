import { SearchParamsProps } from "@/types/types";

const API_ENDPOINT = process.env.ENDPOINT_API;

export const listAllProducts = async ({
  search,
  minPrice,
  maxPrice,
  page,
  category,
  sort,
  limit,
}: SearchParamsProps) => {
  try {
    const res = await fetch(
      `${API_ENDPOINT}/products?limit=${limit}&sort=${sort}&search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&category=${category}`,
      { next: { revalidate: 0 } }
    );

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Error happen while fetching products");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProductInfo = async (id: string) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/products/${id}`);

    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Error happen while fetching products");
    }
  } catch (error) {
    console.error(error);
  }
};
