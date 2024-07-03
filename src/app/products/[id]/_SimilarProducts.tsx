import DangerouslyHTML from "@/components/DangerouslyHTML";
import { rightArrowIcon } from "@/components/Icons";
import { DETAILS, NEW, SAR, SIMILAR_PRODUCTS } from "@/constants/Product";
import formatPrice from "@/helpers/formatPrice";
import { ProductProps } from "@/types/Product";
import Image from "next/image";
import Link from "next/link";

export default function SimilarProducts({
  products,
}: {
  products: ProductProps[];
}) {
  return (
    <div className="container">
      <h2 className="text-3xl w-fit cursor-default p-1 mx-auto sm:text-3xl text-center lg:text-4xl text-green-500 font-semibold">
        {SIMILAR_PRODUCTS}
      </h2>
      <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-4 px-4">
        {products?.map((product) => (
          <li className="my-5" key={product._id}>
            <div className="relative overflow-hidden max-w-[470px] h-full hover:scale-[1.01] duration-300 bg-white border border-gray-200 rounded-lg shadow">
              <Link href={`/products/${product._id}`}>
                <Image
                  className="rounded-t-lg object-contain w-[470px] h-[300px] px-[10px]"
                  src={`${product.photo}`}
                  alt={product.name}
                  width={500}
                  height={500}
                  loading="lazy"
                />
              </Link>
              <div className="p-5">
                <Link href={`/products/${product._id}`}>
                  <h2
                    title={product.name}
                    className="mb-2 line-clamp-1 text-xl font-bold tracking-tight text-gray-900 "
                  >
                    {product.name}
                  </h2>
                </Link>

                <DangerouslyHTML content={product.description} />
                <div className="flex gap-2">
                  <p className="my-2 text-green-600 w-fit rounded py-2 font-bold text-lg">
                    {formatPrice(product.price)} {SAR}
                  </p>
                  <p className="my-2 relative text-green-600 w-fit rounded py-2 font-bold text-sm">
                    {product.oldPrice > 0 &&
                      formatPrice(product.oldPrice) + " " + SAR}
                    <span className="w-full h-[2px] bg-gray-400 absolute top-[35%] left-0"></span>
                  </p>
                </div>
                {product.productIsNew && (
                  <span className="absolute top-2 right-2 bg-green-500 px-4 py-2 font-bold text-white rounded-md">
                    {NEW}
                  </span>
                )}
                <Link
                  href={`/products/${product._id}`}
                  className="flex items-center gap-1 border border-gray-300 w-fit px-3 py-2 text-sm font-semibold text-center duration-150 text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none"
                >
                  <span>{DETAILS}</span>
                  <span className="w-3 h-3 mt-1">{rightArrowIcon}</span>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
