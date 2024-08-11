import {
  THE_ASSURANCE_DOES_NOT_APPLY_DOCUMENT,
  THE_ASSURANCE_DOES_NOT_APPLY_IN_THESE_CASES,
  WARRANTY,
  WARRANTY_DOCUMENT,
  WARRANTY_PAGE_TITLE,
} from "@/constants/Warranty";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: WARRANTY,
};

export default function Warranty() {
  return (
    <main className="my-14">
      <div className="bg-white shadow-lg rounded border border-gray-100 py-8 px-6 mx-5">
        <h1 className="text-xl pb-2 border-b-2 border-green-300 w-fit mx-auto sm:text-2xl lg:text-3xl xl:text-4xl font-semibold">
          {WARRANTY_PAGE_TITLE}
        </h1>
        <div className="max-w-screen-xl my-9">
          {WARRANTY_DOCUMENT.map((document) => (
            <p
              className="text-sm sm:text-md lg:text-lg mb-5 pb-2 border-b-2 border-gray-100"
              key={document.id}
            >
              <span className="text-red-500 font-semibold">
                {document.band}
                {": "}
              </span>
              {document.describe}
            </p>
          ))}
          <h3 className="text-red-700 underline font-bold text-md sm:text-lg lg:text-xl xl:text-2xl my-5">
            {THE_ASSURANCE_DOES_NOT_APPLY_IN_THESE_CASES}
          </h3>
          {THE_ASSURANCE_DOES_NOT_APPLY_DOCUMENT.map((document) => (
            <p
              className="text-sm sm:text-md lg:text-lg mb-5 pb-2 border-b-2 border-gray-100"
              key={document.id}
            >
              <span className="font-bold mx-1 text-red-500">
                {document.id})
              </span>
              {document.band}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
