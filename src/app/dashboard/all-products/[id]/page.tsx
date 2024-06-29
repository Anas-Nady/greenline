import { ProductProps } from "@/types/Product";
import ProductInfo from "@/components/products/ProductInfoPage";
import { getProductInfo } from "@/utils/requests";

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
    oldPrice: 0,
    category: "",
    photo: "",
    images: [],
    seller: "",
  };

  const data = await getProductInfo(id);
  productInfo = data?.product;

  return (
    <main className={`h-[calc(100vh-135px)] bg-white`}>
      <ProductInfo product={productInfo} isDashboard={true} />
    </main>
  );
}
