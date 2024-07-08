import { ProductProps } from "@/types/Product";
import ProductInfo from "@/components/products/ProductInfoPage";
import SimilarProducts from "./_SimilarProducts";
import { GREEN_LINE } from "@/constants/Global";
import NotFoundData from "@/components/NotFoundData";
import { getProductInfo } from "@/utils/requests";

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}) {
  let productInfo: ProductProps = {
    name: "",
    price: 1,
    slug: "",
    description: "",
    cleanDescription: "",
    oldPrice: 0,
    category: "",
    photo: "",
    images: [],
    seller: "",
  };

  const data = await getProductInfo(id);
  productInfo = data?.product;

  return {
    title: productInfo?.name,
    description: productInfo?.cleanDescription,
    image: productInfo?.photo,

    twitter: {
      title: productInfo?.name,
      card: "summary_large_image",
      site: "@GreenLine",
      description: productInfo?.cleanDescription,
      images: [productInfo?.photo],
      url: `${process.env.CLIENT_URL}/products/${id}`,
    },
    openGraph: {
      title: productInfo?.name,
      description: productInfo?.cleanDescription,
      siteName: GREEN_LINE,
      images: [productInfo?.photo],
      url: `${process.env.CLIENT_URL}/products/${id}`,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  let productInfo: ProductProps = {
    name: "",
    price: 1,
    slug: "",
    description: "",
    cleanDescription: "",
    oldPrice: 0,
    category: "",
    photo: "",
    images: [],
    seller: "",
  };

  let similarProducts: ProductProps[] = [];
  let error = false;

  try {
    const data = await getProductInfo(id);

    similarProducts = data?.similarProducts;
    productInfo = data?.product;
  } catch (error) {
    error = true;
  }

  return (
    <main className={`bg-white border-t-2 border-gray-200`}>
      <div className="containers">
        {!error && <ProductInfo product={productInfo} isDashboard={false} />}
        {similarProducts?.length >= 4 && !error && (
          <SimilarProducts products={similarProducts} />
        )}
        {error && <NotFoundData />}
      </div>
    </main>
  );
}
