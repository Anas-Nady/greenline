"use client";

import { categoriesOptions, CHOOSE_CATEGORY } from "@/constants/Categories";
import { SelectInputProps } from "@/types/Input";

export default function SelectInput({ labelName, id }: SelectInputProps) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-lg font-medium text-gray-900"
      >
        {labelName}
      </label>
      <select
        id={id}
        name={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
      >
        <option value="" disabled={true}>
          {CHOOSE_CATEGORY}
        </option>
        {categoriesOptions.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
