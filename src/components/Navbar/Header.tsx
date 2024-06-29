import { GREEN_LINE } from "@/constants/arabic";
import Image from "next/image";
import Link from "next/link";
import NavbarBtn from "./NavbarBtn";
import { authOptions } from "@/lib/authOptions";
import { AuthOptions, getServerSession } from "next-auth";
import logo from "@/assets/imgs/logo/green-line_logo-2.svg";
import { NavbarLinks } from "@/constants/constants";

export default async function Header() {
  const session = await getServerSession(authOptions as AuthOptions);
  let isAdminLoggedIn = false;

  if (session) isAdminLoggedIn = true;
  else isAdminLoggedIn = false;

  return (
    <nav className="bg-white sticky md:overflow-hidden h-[90px] top-0 z-50 items-center border-b border-gray-200 transition-all duration-300">
      <div className="flex px-4 flex-wrap lg:container items-center justify-between mx-auto">
        <Link href="/" className="-mt-[50px] md:-mt-[55px] -ms-6 md:ms-0">
          <div className="z-10">
            <Image src={logo} width={190} height={190} alt={GREEN_LINE} />
          </div>
        </Link>
        <NavbarBtn links={NavbarLinks} isAdminLoggedIn={isAdminLoggedIn} />
      </div>
    </nav>
  );
}
