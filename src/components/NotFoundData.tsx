"use client";

import { NO_DATA_FOUNDED_HERE_NOW } from "@/constants/arabic";

export default function NotFoundData() {
  return (
    <>
      <div className="relative w-full text-gray-900 text-center text-3xl my-5 font-medium">
        {NO_DATA_FOUNDED_HERE_NOW}
      </div>
    </>
  );
}
