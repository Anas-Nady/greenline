"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Checkbox({
  category,
  handleCategoryChange,
}: {
  category: { value: string; label: string };
  handleCategoryChange: any;
}) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  // Ensure radio button reflects current selected category from URL params
  const isChecked = category.value === selectedCategory;

  return (
    <div className="flex items-center mb-4">
      <input
        id={category.value}
        name="category"
        type="radio"
        checked={isChecked}
        value={category.value}
        onChange={() => handleCategoryChange(category.value)}
        className="w-4 h-4 cursor-pointer text-green-600 bg-gray-100 border-gray-300 rounded focus:outline-none focus:ring-0 focus:ring-offset-0"
      />
      <label
        htmlFor={category.value}
        className="ms-2 text-md font-medium cursor-pointer text-gray-900"
      >
        {category.label}
      </label>
    </div>
  );
}
