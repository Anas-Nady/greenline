"use client";

import { whatsappIcon } from "./Icons";
import { usePathname } from "next/navigation";
import { WHATSAPP_NUMBER } from "@/constants/data";
import Link from "next/link";

const Whatsapp = () => {
  const pathname = usePathname();

  const condition =
    pathname.includes("dashboard") || pathname.includes("login");

  return (
    !condition && (
      <div>
        <Link
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          className="fixed text-white animate-pulse hover:animate-spin bottom-8 sm:bottom-6 z-50 w-10 h-10 sm:w-14 sm:h-14 text-center left-1 sm:left-4 bg-[#25d366] hover:bg-[#25d365ee] p-2 rounded-full focus:outline-none"
        >
          {whatsappIcon}
        </Link>
      </div>
    )
  );
};

export default Whatsapp;
