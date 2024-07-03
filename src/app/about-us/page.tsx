import { ABOUT_US, ABOUT_US_DESCRIPTIONS } from "@/constants/AboutUs";
import AboutUs from "@/components/sections/AboutUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: ABOUT_US,
};

export default function AboutUsPage() {
  return (
    <section className="container">
      <AboutUs isSection={false} />
      <div className="w-full shadow-md rounded text-gray-600 text-lg bg-white mt-2 px-6 py-6">
        {ABOUT_US_DESCRIPTIONS.DESCRIPTION_THERE}
      </div>
      <div className="w-full shadow-md rounded text-gray-600 text-lg bg-white mt-2 px-6 py-6">
        {ABOUT_US_DESCRIPTIONS.DESCRIPTION_FOUR}
      </div>
    </section>
  );
}
