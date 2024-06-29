"use client";

import { TextareaProps } from "@/types/Input";

export default function Textarea({ id, labelName }: TextareaProps) {
  return (
    <div className="relative mb-6">
      <label htmlFor={id} className="block text-lg font-medium text-gray-900 ">
        {labelName}
      </label>
      <textarea
        className="block text-lg min-h-[auto] w-full rounded border-2 border-gray-200 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none focus:ring-0 focus:border-2 focus:border-green-500 focus:outline-none"
        id={id}
        name={id}
        required
        rows={3}
      ></textarea>
    </div>
  );
}
