import {
  ABOUT_US,
  ABOUT_US_DESCRIPTIONS,
  LEARN_MORE_ABOUT_US,
} from "@/constants/AboutUs";
import Headline from "@/components/Headline";
import Link from "next/link";
import Image from "next/image";

export default function AboutUs({ isSection }: { isSection: boolean }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
      <div className="about-info shadow h-full p-6 flex-1 bg-white order-last lg:order-first">
        <Headline text={ABOUT_US} />
        <p className="mt-5 text-gray-600 text-lg leading-relaxed">
          {ABOUT_US_DESCRIPTIONS.DESCRIPTION_ONE}
        </p>
        <p className="mt-5 text-gray-600 text-lg leading-relaxed">
          {ABOUT_US_DESCRIPTIONS.DESCRIPTION_TWO}
        </p>
        {isSection && (
          <div className="mt-8 px-4">
            <Link
              href="/about-us"
              className="text-green-500 underline hover:text-green-600 font-semibold text-md"
            >
              {LEARN_MORE_ABOUT_US}
            </Link>
          </div>
        )}
      </div>
      <div className="mt-12 shadow flex-1 h-[395px] about-img md:mt-0 order-first lg:order-last">
        <Image
          src="https://png.pngtree.com/thumb_back/fh260/background/20230630/pngtree-3d-render-of-outdoor-air-conditioner-unit-successfully-installed-image_3705283.jpg"
          alt="Green Line"
          width={500}
          height={500}
          className="object-cover w-full h-full rounded-lg shadow-md"
        />
      </div>
    </section>
  );
}
