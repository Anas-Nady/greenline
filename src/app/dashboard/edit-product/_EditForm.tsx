"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Input from "./_Input";
import Spinner from "@/components/Spinner";
import { ProductProps } from "@/types/Product";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  NAME,
  OLD_PRICE,
  PRICE,
  PRODUCT_IS_NEW,
  SAVE_CHANGES,
  SELLER,
} from "@/constants/arabic";
import { PRODUCT_UPDATED } from "@/constants/toastArabicMessages";

export default function EditProductForm({ slug: id }: { slug: string }) {
  const [productIsNew, setProductIsNew] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [product, setProduct] = useState<ProductProps>({
    name: "",
    oldPrice: 0,
    price: 0,
    images: [],
    photo: "",
    category: "",
    slug: "",
    seller: "",
    productIsNew,
  });

  const getProductInfo = async () => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "GET",
        cache: "no-store",
      });

      if (res.ok && res.status === 200) {
        const data = await res.json();
        setProduct(data.product);
        setProductIsNew(data.product.productIsNew);
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoadingProduct(false);
    }
  };

  useEffect(() => {
    getProductInfo();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);
    const name = formData.get("name");
    const oldPrice = formData.get("oldPrice");
    const price = formData.get("price");
    const seller = formData.get("seller");

    try {
      setLoading(true);
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          price,
          oldPrice,
          seller,
          productIsNew,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        toast.success(PRODUCT_UPDATED);
        router.push("/dashboard/all-products");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingProduct) {
    return <Spinner loading={loadingProduct} />;
  } else {
    return (
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-5 border-2 border-gray-200"
      >
        <Input
          id="name"
          labelName={NAME}
          type="text"
          defaultValue={product.name}
        />
        <div className="grid md:grid-cols-2 md:gap-6">
          <Input
            id="oldPrice"
            labelName={OLD_PRICE}
            type="number"
            defaultValue={product.oldPrice}
          />
          <Input
            id="price"
            labelName={PRICE}
            type="number"
            defaultValue={product.price}
          />
        </div>
        <Input
          id="seller"
          labelName={SELLER}
          type="text"
          defaultValue={product.seller}
        />
        <div>
          <label className="inline-flex items-center mb-5 cursor-pointer">
            <input
              name="productIsNew"
              type="checkbox"
              checked={productIsNew}
              onChange={() => setProductIsNew((prev) => !Boolean(prev))}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-600"></div>
            <span className="ms-3 text-lg font-medium text-gray-900">
              {PRODUCT_IS_NEW}
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${
            loading && "cursor-not-allowed opacity-40"
          } text-white my-4 duration-200 bg-green-500 hover:bg-green-700 focus:outline-none font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center`}
        >
          {SAVE_CHANGES}
        </button>
      </form>
    );
  }
}
