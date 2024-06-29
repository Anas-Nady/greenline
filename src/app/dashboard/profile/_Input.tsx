"use client";

import { InputProps } from "@/types/Input";

export default function Input({
  type,
  id,
  placeholder = "",
  labelName,
  isReadOnly = false,
}: InputProps) {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-lg font-medium text-gray-900 "
      >
        {labelName}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        placeholder={placeholder}
        readOnly={isReadOnly}
      />
    </div>
  );
}
