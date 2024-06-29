"use client";

import { REFRESH_PAGE, SERVER_ERROR_PAGE } from "@/constants/arabic";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body dir="ltr">
        <div className="flex justify-center items-center h-screen flex-col gap-5 p-5">
          <div className="max-w-screen-lg mx-auto text-center p-11 shadow-lg bg-gray-100 rounded border-gray-200">
            <h2 className="text-lg my-5 sm:text-xl lg:text-2xl xl:text-2xl font-semibold text-red-500">
              {SERVER_ERROR_PAGE}
            </h2>
            <p className="text-lg sm:text-xl">{error?.message}</p>
            <button
              onClick={() => reset()}
              className="bg-red-500 my-5 text-white px-5 py-2 rounded hover:bg-red-600 duration-200 text-lg font-bold"
            >
              {REFRESH_PAGE}
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
