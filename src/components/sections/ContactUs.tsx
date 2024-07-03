import ContactUsForm from "@/components/ContactUs/ContactUsForm";
import ContactUsInfo from "@/components/ContactUs/ContactUsInfo";
import LocationMap from "@/components/ContactUs/LocationMap";
import Headline from "@/components/Headline";
import { CONTACT_US } from "@/constants/ContactUs";

export default function ContactUs() {
  return (
    <section>
      <Headline text={CONTACT_US} />
      <LocationMap />

      <div className="px-0 xl:px-12">
        <div className="block rounded-lg bg-[hsla(0,0%,100%,0.8)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]  md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px] border border-gray-300">
          <div className="flex flex-wrap">
            <ContactUsForm />
            <ContactUsInfo />
          </div>
        </div>
      </div>
    </section>
  );
}
