import type { Metadata } from "next";
import Accordion from "./_Accordion";
import { FAQS } from "@/constants/Faqs";

export const metadata: Metadata = {
  title: FAQS,
};

export default function Faqs() {
  return (
    <main className="my-9">
      <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
        {FAQS}
      </h1>
      <Accordion />
    </main>
  );
}
