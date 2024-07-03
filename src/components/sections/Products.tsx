import Link from "next/link";
import { ProductProps } from "@/types/Product";
import Image from "next/image";
import { DETAILS, NEW, OUR_PRODUCTS, SAR, SEE_MORE } from "@/constants/Product";
import formatPrice from "@/helpers/formatPrice";
import Headline from "@/components/Headline";
import DangerouslyHTML from "@/components/DangerouslyHTML";
import { rightArrowIcon } from "@/components/Icons";

export default async function Products() {
  let products: ProductProps[] = [];

  try {
    const res = await fetch(
      `${process.env.ENDPOINT_API}/products?topViews=true&limit=3`,
      { cache: "no-store" }
    );
    const data = await res.json();

    if (res.ok) {
      products = data.products;
    } else {
      console.error(data?.message);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    products.length > 0 && (
      <section>
        <Headline text={OUR_PRODUCTS} />
        <ul className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 justify-items-center">
          {products.map((product) => (
            <div key={product._id}>
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
            </div>
          ))}
        </ul>
        <div className="flex justify-center my-5">
          <Link
            href="/products"
            className="text-lg sm:text-xl bg-green-500 text-slate-200 font-semibold rounded px-4 py-2 hover:bg-green-600 duration-500"
          >
            {SEE_MORE}
          </Link>
        </div>
      </section>
    )
  );
}
