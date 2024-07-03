"use client";

import {
  CATEGORY,
  CLEAR_FILTER,
  FILTER_BY,
  PRICE,
  PRICE_FROM_DOWN_TO_UP,
  PRICE_FROM_UP_TO_DOWN,
} from "@/constants/Product";
import { categoriesOptions } from "@/constants/Categories";
import Checkbox from "./_Checkbox";
import { useState, useEffect } from "react";
import { arrowDownIcon, arrowUpIcon, checkedIcon } from "@/components/Icons";
import { CategoryCountsProps } from "@/types/Product";
import { getCategoryCount } from "@/helpers/getCategoryCount";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function FilterOptions({
  categoryCounts,
}: {
  categoryCounts: CategoryCountsProps[];
}) {
  const [openAccordions, setOpenAccordions] = useState([true, true]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceSort, setSelectedPriceSort] = useState<string | null>(
    null
  );
  const searchParams = useSearchParams();

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    const selectedCategoryParam = params.get("category");
    const selectedSortParam = params.get("sort");

    setSelectedCategory(selectedCategoryParam);
    setSelectedPriceSort(selectedSortParam);
  }, [searchParams]);

  const handleToggle = (index: number) => {
    setOpenAccordions((prevOpenAccordions) => {
      const newOpenAccordions = [...prevOpenAccordions];
      newOpenAccordions[index] = !newOpenAccordions[index];
      return newOpenAccordions;
    });
  };

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (selectedCategory === category) {
      params.delete("category");
      setSelectedCategory(null);
    } else {
      params.set("category", category);
      setSelectedCategory(category);
    }
    params.set("page", "1");
    router.push(`${pathName}?${params.toString()}`);
  };

  const handlePriceChange = (sortBy: string) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("sort", sortBy);

    setSelectedPriceSort(sortBy);

    params.set("page", "1");
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <aside className="px-4">
      <h2 className="text-xl sm:text-2xl xl:text-3xl text-gray-600 pb-4 font-semibold">
        {FILTER_BY}
      </h2>
      <Link
        href="/products"
        className="block text-blue-500 mb-2 hover:underline"
      >
        {CLEAR_FILTER}
      </Link>
      <div className={`accordion-item w-full sm:w-[220px]`}>
        <span
          onClick={() => handleToggle(0)}
          className={`accordion-button cursor-pointer flex items-center justify-between p-5 w-full font-medium rtl:text-right text-gray-600 border border-b-0 border-gray-300 rounded-t-xl focus:ring-4 focus:ring-gray-200 gap-3`}
        >
          <h3 className="capitalize text-xl">{PRICE}</h3>
          <div className="duration-200 flex gap-2">
            <div className="text-green-500 text-lg font-bold"></div>
            {openAccordions[0] ? arrowUpIcon : arrowDownIcon}
          </div>
        </span>
        {openAccordions[0] && (
          <div className="accordion-body w-full">
            <div
              className={`p-5 flex items-center gap-1 cursor-pointer hover:bg-gray-200 border border-b-0 border-gray-300 w-full ${
                selectedPriceSort == "price" ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handlePriceChange("price")}
            >
              {selectedPriceSort === "price" && (
                <span className="text-green-500">{checkedIcon}</span>
              )}
              <span>{PRICE_FROM_DOWN_TO_UP}</span>
            </div>
            <div
              className={`p-5 flex items-center gap-1 cursor-pointer hover:bg-gray-200 border border-b-0  border-gray-300 w-full ${
                selectedPriceSort == "-price" ? "bg-gray-200" : "bg-white"
              }`}
              onClick={() => handlePriceChange("-price")}
            >
              {selectedPriceSort === "-price" && (
                <span className="text-green-500">{checkedIcon}</span>
              )}
              <span>{PRICE_FROM_UP_TO_DOWN}</span>
            </div>
          </div>
        )}
      </div>
      <div className={`accordion-item w-full sm:w-[220px]`}>
        <span
          onClick={() => handleToggle(1)}
          className={`accordion-button cursor-pointer flex items-center justify-between p-5 w-full font-medium rtl:text-right text-gray-600 border border-b-0 border-gray-300 rounded-t-xl focus:ring-4 focus:ring-gray-200 gap-3`}
        >
          <h3 className="capitalize text-xl">{CATEGORY}</h3>
          <div className="duration-200 flex gap-2">
            <div className="text-green-500 text-lg font-bold"></div>
            {openAccordions[1] ? arrowUpIcon : arrowDownIcon}
          </div>
        </span>
        {openAccordions[1] && (
          <div className="accordion-body w-full">
            <div className="py-5 flex flex-col px-4 border border-b-0 bg-white w-full">
              {categoriesOptions.map((category, i) => (
                <div
                  key={category.value}
                  className={`w-full border border-slate-200 px-3 pt-2 mt-2 rounded-sm flex justify-between gap-1 items-center ${
                    selectedCategory === category.value ? "bg-gray-200" : ""
                  }`}
                >
                  <Checkbox
                    handleCategoryChange={handleCategoryChange}
                    category={category}
                    key={i}
                  />
                  <span className="mb-3 text-green-500 font-bold">
                    ({getCategoryCount(categoryCounts, category.value)})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
