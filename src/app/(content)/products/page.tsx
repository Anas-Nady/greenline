import { CategoryCountsProps, ProductProps } from "@/types/Product";
import FilterOptions from "./_FilterOptions";
import ProductList from "./_ProductList";
import Spinner from "@/components/Spinner";
import { listAllProducts } from "@/utils/requests";
import type { Metadata } from "next";
import { PRODUCTS } from "@/constants/Product";
import { SearchParamsProps } from "@/types/types";

export const metadata: Metadata = {
  title: PRODUCTS,
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParamsProps;
}) {
  let products: ProductProps[] = [];
  let pagination = { currentPage: 1, totalPages: 1 };
  let loading: boolean = false;
  let categoryCounts: CategoryCountsProps[] = [];

  const search = searchParams.search || "";
  const minPrice = searchParams.minPrice || 0;
  const maxPrice = searchParams.maxPrice || Infinity;
  const page = searchParams.page || 1;
  const category = searchParams.category || "";
  const sort = searchParams.sort || "";
  const limit: number = 12;

  try {
    loading = true;
    const data = await listAllProducts({
      search,
      minPrice,
      maxPrice,
      page,
      category,
      sort,
      limit,
    });
    products = data.products;
    categoryCounts = data.categoryCounts;
    pagination = data.pagination;
  } catch (error) {
    console.error(error);
  } finally {
    loading = false;
  }

  return (
    <main className="flex gap-5 flex-col sm:flex-row my-5">
      <FilterOptions categoryCounts={categoryCounts} />
      <div>
        {loading && <Spinner loading={loading} />}
        {!loading && (
          <ProductList products={products} paginationData={pagination} />
        )}
      </div>
    </main>
  );
}
