"use client";

import { InputProps } from "@/types/Input";

export default function _Input({
  type,
  id,
  labelName,
  isRequired = false,
  defaultValue = "",
  placeholder = " ",
}: InputProps) {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type={type}
        name={id}
        id={id}
        className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={isRequired}
      />
      <label
        htmlFor={id}
        className="peer-focus:font-medium absolute text-lg text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {labelName}
      </label>
    </div>
  );
}
