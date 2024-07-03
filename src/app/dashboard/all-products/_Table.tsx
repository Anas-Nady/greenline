"use client";
import { editIcon, searchIcon, trashIcon } from "@/components/Icons";
import NotFoundData from "@/components/NotFoundData";
import Spinner from "@/components/Spinner";
import {
  CATEGORIES_OPTIONS,
  CATEGORY,
  NEXT,
  OPTIONS,
  PREVIOUS,
  PRICE,
  PRODUCT_NAME,
  SAR,
  SEARCH_PLACEHOLDER,
  SELLER,
} from "@/constants/Global";
import { categoriesOptions } from "@/constants/constants";
import { PRODUCT_DELETED } from "@/constants/ToastArabicMessages";
import formatPrice from "@/helpers/formatPrice";
import { getCategoryArabicName } from "@/helpers/getCategoryArbicName";
import { ProductProps } from "@/types/Product";
import { Pagination } from "flowbite-react";
import Link from "next/link";
import React, { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Table() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingDeleteProduct, setLoadingDeleteProduct] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const getProducts = async (
    pagination: { currentPage: number },
    category: string,
    search: string
  ) => {
    try {
      setLoadingProducts(true);
      const res = await fetch(
        `/api/products?page=${pagination.currentPage}&category=${category}&search=${search}&fields=_id,name,price,seller,category`,
        { cache: "no-store" }
      );

      if (res.ok) {
        const data = await res.json();
        console.log(data.products);
        setProducts(data.products);
        setPagination(data.pagination);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleDeleteProduct = async (id: string | undefined) => {
    try {
      setLoadingDeleteProduct(true);
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(PRODUCT_DELETED);
        getProducts(pagination, category, search);
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoadingDeleteProduct(false);
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    getProducts(pagination, category, search);
  };

  useEffect(() => {
    getProducts(pagination, category, search);
  }, [pagination.currentPage]);

  return (
    <>
      <form className="max-w-lg mx-auto mb-5" onSubmit={handleSearch}>
        <div className="flex">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="z-10 inline-flex w-[200px] focus:ring-0 border-2 border-gray-300 focus:border-green-500 border-e-gray-400 items-center py-2 px-3 text-lg font-medium text-center text-gray-900 bg-gray-100 rounded-s-md hover:bg-gray-200 focus:outline-none"
          >
            <option value="">{CATEGORIES_OPTIONS.ALL_CATEGORIES}</option>
            {categoriesOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="relative w-full">
            <input
              type="search"
              id="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="block p-2.5 w-full z-20 rounded-e-lg text-lg text-gray-900 border-2 border-gray-300 bg-gray-50 focus:outline-none border-s-0 focus:border-green-500 focus:ring-0"
              placeholder={SEARCH_PLACEHOLDER}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-lg font-medium h-full text-white bg-green-500 rounded border-none hover:bg-green-600 duration-200 focus:outline-none"
            >
              {searchIcon}
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>

      {loadingProducts && <Spinner loading={loadingProducts} />}
      {!loadingProducts && products.length === 0 ? (
        <NotFoundData />
      ) : (
        products.length > 0 && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-5">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xl font-semibold">
                    {PRODUCT_NAME}
                  </th>
                  <th scope="col" className="px-6 py-3 text-xl font-semibold">
                    <div className="flex items-center">
                      {SELLER}
                      {/* <button>{topAndBottomArrowIcon}</button> */}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-xl font-semibold">
                    <div className="flex items-center">
                      {CATEGORY}
                      {/* <button>{topAndBottomArrowIcon}</button> */}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-xl font-semibold">
                    <div className="flex items-center">
                      {PRICE}
                      {/* <button>{topAndBottomArrowIcon}</button> */}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-xl font-semibold">
                    <span className="sr-only">Edit</span>
                    <div className="flex items-center">
                      {OPTIONS}
                      {/* <button>{topAndBottomArrowIcon}</button> */}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="bg-white border-b">
                    <Link href={`/dashboard/all-products/${product._id}`}>
                      <th
                        scope="row"
                        className="hover:underline text-lg px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {product.name}
                      </th>
                    </Link>
                    <td className="px-6 py-4 text-md font-semibold">
                      {product.seller}
                    </td>
                    <td className="px-6 py-4 text-md font-semibold">
                      {getCategoryArabicName(product.category)}
                    </td>
                    <td className="px-6 py-4 text-md font-semibold">
                      {formatPrice(product.price)} {SAR}
                    </td>
                    <td className="px-6 py-4 text-right flex gap-1">
                      <Link
                        href={`/dashboard/edit-product?slug=${product._id}`}
                        className="w-6 h-6 sm:w-8 sm:h-8 font-medium text-blue-500 hover:text-gray-700 duration-200"
                      >
                        {editIcon}
                      </Link>
                      <button
                        disabled={loadingDeleteProduct}
                        onClick={() => handleDeleteProduct(product._id)}
                        className={`${
                          loadingDeleteProduct &&
                          "cursor-not-allowed opacity-30"
                        } w-6 h-6 sm:w-8 sm:h-8 font-medium text-blue-600 hover:text-red-500 duration-150`}
                      >
                        {trashIcon}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length > 0 && (
              <div className="m-4 mb-0">
                <Pagination
                  nextLabel={NEXT}
                  previousLabel={PREVIOUS}
                  currentPage={pagination.currentPage || 1}
                  totalPages={pagination.totalPages || 1}
                  onPageChange={(next) =>
                    setPagination({ ...pagination, currentPage: next })
                  }
                />
              </div>
            )}
          </div>
        )
      )}
    </>
  );
}
