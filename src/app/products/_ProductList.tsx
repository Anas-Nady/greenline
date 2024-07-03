"use client";
import Image from "next/image";
import Link from "next/link";
import DangerouslyHTML from "@/components/DangerouslyHTML";
import { DETAILS, NEW, SAR, SEARCH_PLACEHOLDER } from "@/constants/Product";
import { rightArrowIcon, searchIcon } from "@/components/Icons";
import { ProductProps } from "@/types/Product";
import formatPrice from "@/helpers/formatPrice";
import NotFoundData from "@/components/NotFoundData";
import { Pagination } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { PLEASE_WRITE_SOMETHING } from "@/constants/ToastArabicMessages";
import { NEXT, PREVIOUS } from "@/constants/Global";

export default function ProductList({
  products,
  paginationData,
}: {
  products: ProductProps[];
  paginationData: { currentPage: number; totalPages: number };
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    setPagination(paginationData);
    setSearch(decodeURIComponent(searchParams.get("search") || ""));
  }, [paginationData]);

  const handleProductSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchValueCheck = search.trim().length;

    if (searchValueCheck === 0) {
      toast.error(PLEASE_WRITE_SOMETHING);
      return;
    }

    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("search", search.trim());
    router.push(`${pathName}?${params.toString()}`);
  };

  if (products.length === 0) {
    return <NotFoundData />;
  } else {
    return (
      <main className="container">
        <form
          onSubmit={handleProductSearch}
          className="relative max-w-screen-sm my-5 mx-5 xl:mx-auto"
        >
          <input
            type="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block p-2.5 w-full z-20 rounded-e-lg text-lg text-gray-900 border-2 border-gray-300 bg-gray-50 focus:outline-none focus:border-green-500 focus:ring-0"
            placeholder={SEARCH_PLACEHOLDER}
          />
          <button
            type="submit"
            className={`${
              search.trim().length === 0 && "cursor-not-allowed"
            } absolute top-0 end-0 py-2.5 px-4 text-lg font-medium h-full text-white bg-green-500 rounded border-none hover:bg-green-600 duration-200 focus:outline-none`}
          >
            {searchIcon}
            <span className="sr-only">Search</span>
          </button>
        </form>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-content-center gap-4 px-4">
          {products.map((product) => (
            <div key={product._id}>
              <div className="relative overflow-hidden max-w-1/3 h-full hover:scale-[1.01] duration-300 bg-white border border-gray-200 rounded-lg shadow">
                <Link href={`/products/${product._id}`}>
                  <Image
                    className="rounded-t-lg object-contain px-[10px] w-[400px] h-[250px]"
                    src={`${product.photo}`}
                    alt={product.name}
                    width={500}
                    height={500}
                    loading="lazy"
                  />
                </Link>
                <div className="p-5">
                  <Link href={`/products/${product._id}`}>
                    <h2
                      title={product.name}
                      className="mb-3  line-clamp-1 text-xl font-bold tracking-tight text-gray-900 "
                    >
                      {product.name}
                    </h2>
                  </Link>

                  <DangerouslyHTML content={product.description} />
                  <div className="flex gap-2 h-[80px]">
                    <p className="my-2 text-green-600 w-fit rounded py-2 font-bold text-md">
                      {formatPrice(product.price)} {SAR}
                    </p>
                    <p className="my-2 line-through relative text-green-600 rounded py-2 font-bold text-sm">
                      {product.oldPrice > 0 &&
                        formatPrice(product.oldPrice) + " " + SAR}
                    </p>
                  </div>
                  {product.productIsNew && (
                    <span className="absolute top-2 right-2 bg-green-500 px-4 py-2 font-bold text-white rounded-md">
                      {NEW}
                    </span>
                  )}
                  <Link
                    href={`/products/${product._id}`}
                    className="flex items-center gap-1 border border-gray-300 w-fit px-3 py-2 text-sm font-semibold text-center duration-150 text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
                  >
                    <span>{DETAILS}</span>
                    <span className="w-3 h-3 mt-1">{rightArrowIcon}</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        {products.length > 0 && (
          <div className="px-4">
            <Pagination
              nextLabel={NEXT}
              previousLabel={PREVIOUS}
              currentPage={pagination.currentPage || 1}
              totalPages={pagination.totalPages || 1}
              onPageChange={(next) => {
                const params = new URLSearchParams(
                  Array.from(searchParams.entries())
                );
                params.set("page", next.toString());
                setPagination({ ...pagination, currentPage: next });
                router.push(`${pathName}?${params.toString()}`);
              }}
            />
          </div>
        )}
      </main>
    );
  }
}
