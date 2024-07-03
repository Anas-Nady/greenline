"use client";

import { logoutIcon, rightArrowIcon } from "@/components/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { dashboardLinks } from "@/constants/DashboardLinks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { DASHBOARD_LINKS } from "@/constants/DashboardLinks";
import logout from "@/utils/logout";
import { LOGOUT_SUCCESS } from "@/constants/ToastArabicMessages";

export default function DashboardAsideBar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    await logout();

    toast.success(LOGOUT_SUCCESS);
    router.push("/");
  };

  return (
    <aside
      className={`sidebar relative border border-slate-300 bg-white min-h-screen p-5 ${
        isOpen ? "w-64" : "w-20"
      } duration-200`}
    >
      <span
        className={`${
          !isOpen && "rotate-180"
        } absolute z-50 -left-3 duration-200 w-8 h-8 top-5 px-1 py-1.5 rounded-full cursor-pointer text-gray-600 bg-gray-200 border border-gray-700`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {rightArrowIcon}
      </span>
      <ul className="mx-1">
        {dashboardLinks.map((link) => {
          return (
            <Link
              href={`/dashboard/${link.url}`}
              key={link.url}
              title={link.name}
              className={`flex relative ${
                !isOpen && "justify-center"
              } gap-2 mb-1 rounded text-xl text-gray-900 ${
                pathName.includes(link.url) &&
                "text-gray-800 border-slate-300 bg-slate-200"
              } hover:bg-slate-200 px-2 py-2 duration-300`}
            >
              <span
                className={`${
                  !isOpen && "rotate-[360deg]"
                }  w-6 h-6 sm:w-8 sm:h-8 duration-500`}
              >
                {link.icon}
              </span>

              {isOpen && (
                <li className={`${!isOpen && "scale-0 "} duration-300 `}>
                  {link.name}
                </li>
              )}
              {/* {link.url === "messages" && messagesCount >= 1 && (
                <span className="top-0 ltr:-left-1 rtl:-right-1 absolute  w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
              )} */}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className={`flex w-full gap-2 text-gray-900 ${
            !isOpen && "justify-center"
          } text-xl hover:bg-slate-200 px-2 py-2 rounded duration-300`}
        >
          <span
            className={`${
              !isOpen && "rotate-[360deg]"
            } duration-500 w-6 h-6 sm:w-8 sm:h-8`}
          >
            {logoutIcon}
          </span>

          {isOpen && (
            <li className={`${!isOpen && "scale-0"} duration-300`}>
              {DASHBOARD_LINKS.LOGOUT}
            </li>
          )}
        </button>
      </ul>
    </aside>
  );
}
