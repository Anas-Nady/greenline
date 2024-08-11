import { repairIcon } from "@/components/Icons";
import {
  MAINTENANCE,
  MAINTENANCE_DOCUMENT,
  MAINTENANCE_PAGE_TITLE,
} from "@/constants/Maintenance";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: MAINTENANCE,
};

export default function Maintenance() {
  return (
    <main className="my-14">
      <div className="bg-white shadow-lg rounded border border-gray-100 py-8 px-6 mx-5">
        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold">
          {MAINTENANCE_PAGE_TITLE}
        </h1>
        <div className="max-w-screen-lg my-9">
          {MAINTENANCE_DOCUMENT.map((document) => (
            <p
              className="text-sm sm:text-md lg:text-lg mb-5 pb-2 border-b-2 border-gray-100 flex items-start gap-2"
              key={document.id}
            >
              <span className="text-green-500">{repairIcon}</span>
              <span>{document.title}</span>
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
