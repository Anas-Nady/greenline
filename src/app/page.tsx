import AboutUs from "@/components/sections/AboutUs";
import Categories from "@/components/sections/Categories";
import ContactUs from "@/components/sections/ContactUs";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Testimonials from "@/components/sections/Testimonials";

export default function RootPage() {
  return (
    <>
      <Hero />
      <div className="container py-16 px-4 sm:px-6 lg:px-8">
        <Categories />
        <Products />
        <Testimonials />
        <AboutUs isSection={true} />
        <ContactUs />
      </div>
    </>
  );
}
