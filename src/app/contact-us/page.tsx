import { CONTACT_US } from "@/constants/ContactUs";
import ContactUs from "@/components/sections/ContactUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: CONTACT_US,
};

export default function ContactUsPage() {
  return (
    <main className="container">
      <ContactUs />
    </main>
  );
}
