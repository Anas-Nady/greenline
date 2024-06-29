import { CATEGORIES } from "@/constants/arabic";
import { categoriesOptions } from "@/constants/constants";

import Headline from "@/components/Headline";
import Card from "@/components/Categories/Card";

export default function Categories() {
  return (
    <section>
      <Headline text={CATEGORIES} />
      <ul className="relative grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center overflow-hidden py-6 sm:py-12 gap-5">
        {categoriesOptions.map((category) => (
          <Card
            key={category.value}
            categoryName={category.label}
            categoryDescription={category.description}
            backgroundImg={`bg-${category.value}`}
            categoryValue={category.value}
          />
        ))}
      </ul>
    </section>
  );
}
