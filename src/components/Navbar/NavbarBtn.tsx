"use client";

import React, { useState } from "react";
import { menuIcon, whatsappIcon } from "../Icons";
import { userIcon } from "@/app/dashboard/_components/Icons";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { NavbarLinkProps } from "@/types/types";

export default function NavbarBtn({
  links,
  isAdminLoggedIn,
}: {
  links: NavbarLinkProps[];
  isAdminLoggedIn: boolean;
}) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex -mt-11 sm:px-0 md:order-2 gap-1 shadow-none">
        <Link
          href="https://wa.me/+201211076875"
          target="_blank"
          className="text-gray-700 duration-200 bg-slate-100 hover:bg-slate-200 focus:ring-0 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center border border-gray-300"
        >
          {whatsappIcon}
        </Link>

        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-11 h-11 justify-center text-sm text-gray-500 rounded-lg md:hidden bg-slate-100 hover:bg-gray-200 focus:outline-none ring-0 border border-gray-300"
        >
          {menuIcon}
        </button>

        {isAdminLoggedIn && (
          <button
            type="button"
            className="hidden lg:flex"
            onClick={() => router.push(`/dashboard/add-product`)}
          >
            <div className="relative w-11 h-11 py-2 overflow-hidden bg-gray-100 border border-gray-300 hover:bg-gray-300 rounded-lg">
              {userIcon}
            </div>
          </button>
        )}
      </div>
      <div
        className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex me-0 md:me-14 flex-col -mt-9 p-4 gap-4 md:p-0 text-md sm:text-lg md:text-xl xl:text-2xl font-semibold border rounded-lg bg-gray-100 border-gray-200 md:bg-white md:shadow-none md:border-none shadow  md:flex-row md:border-0">
          {links.map((link) => (
            <li key={link.path} onClick={toggleMenu} className="text-start">
              <Link
                href={`/${link.path}`}
                className={`block py-2 px-3 md:py-2 md:px-3 rounded-full hover:text-green-500 sm:hover:text-white sm:hover:bg-green-500  duration-300 text-gray-600 ${
                  pathName.endsWith(link.path) && "bg-green-500 text-white"
                }  `}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
