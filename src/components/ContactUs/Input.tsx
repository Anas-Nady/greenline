"use client";

import { InputProps } from "@/types/Input";

export default function Input({ type, id, labelName }: InputProps) {
  return (
    <div className="relative mb-6">
      <label className="block text-lg font-medium text-gray-900" htmlFor={id}>
        {labelName}
      </label>
      <input
        type={type}
        className="shadow-sm focus:ring-0 bg-gray-50 border border-gray-200 text-gray-900 text-lg rounded-md focus:border-2 focus:border-green-500 block w-full p-2.5"
        id={id}
        name={id}
        required
      />
    </div>
  );
}
