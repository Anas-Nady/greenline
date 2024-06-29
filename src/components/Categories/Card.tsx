import { CategoryCardProps } from "@/types/Product";
import Link from "next/link";

export default function Card({
  categoryName,
  categoryDescription,
  backgroundImg,
  categoryValue,
}: CategoryCardProps) {
  return (
    <Link
      href={`/products?category=${categoryValue}`}
      className="category-card"
    >
      <div
        title={categoryDescription}
        className={`${backgroundImg} bg-contain bg-center bg-no-repeat w-[370px] 2xl:w-[470px] h-[230px] relative bg-white px-6 pt-10 pb-8  sm:mx-auto sm:max-w-1/3 sm:rounded-lg sm:px-10 group`}
      >
        <div className="category-card-overlay"></div>
      </div>
      <h3 className="category-card-name">{categoryName}</h3>
    </Link>
  );
}
