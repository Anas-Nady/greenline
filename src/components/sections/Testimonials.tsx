import Headline from "@/components/Headline";
import Slider from "@/components/Testimonials/Slider";
import { TESTIMONIALS } from "@/constants/Testimonials";

export default function Testimonials() {
  return (
    <section>
      <Headline text={TESTIMONIALS} />
      <div className="relative">
        <Slider />
      </div>
    </section>
  );
}
