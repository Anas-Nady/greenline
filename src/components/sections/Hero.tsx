import { HERE_WELCOME_TEXT, SEE_OUT_PRODUCTS } from "@/constants/arabic";
import Link from "next/link";

export default function Hero() {
  return (
    <main className="h-[calc(100vh-65px)] bg-hero-background bg-cover bg-center bg-no-repeat bg-fixed flex justify-center items-center">
      <div className="flex flex-col gap-5 mx-5">
        <p className="text-4xl mx-0 sm:mx-5 xl:mx-32 text-white font-semibold sm:text-5xl xl:text-6xl 2xl:text-7xl">
          {HERE_WELCOME_TEXT}
        </p>
        <Link
          href="/products"
          className="text-lg sm:text-xl bg-green-500 hover:bg-green-600 duration-200 rounded px-4 py-3 w-fit mx-auto text-white font-semibold"
        >
          {SEE_OUT_PRODUCTS}
        </Link>
      </div>
    </main>
  );
}
