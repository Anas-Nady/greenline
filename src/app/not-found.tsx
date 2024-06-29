"use client";

import { NOT_FOUND_PAGE } from "@/constants/arabic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const metadata = {
  title: NOT_FOUND_PAGE,
};

export default function NotFound() {
  const pathName = usePathname();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const handleNavigation = () => {
    window.location.href = "/";
  };

  return (
    mount && (
      <html lang="ar">
        <body dir="rtl">
          <section className="bg-white">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-green-600">
                  404
                </h1>
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
                  Something's missing.
                </p>
                <p className="mb-4 text-lg font-light text-gray-500">
                  Sorry, we can't find{"  "}
                  <span className="font-bold text-green-600 ">{pathName}</span>.
                  You'll find lots to explore on the home page.{" "}
                </p>
                <button
                  onClick={() => handleNavigation()}
                  className="inline-flex text-white bg-green-600 hover:bg-green-800 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </section>
        </body>
      </html>
    )
  );
}
