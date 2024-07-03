"use client";
import { FormEvent, useEffect, useState } from "react";
import Input from "./_Input";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";
import SelectInput from "./_SelectInput";
import toast from "react-hot-toast";
import {
  DESCRIPTION_IS_REQUIRED,
  MAXIMUM_SIX_IMAGES_ALLOWED,
  PRODUCT_ADDED,
} from "@/constants/ToastArabicMessages";
import {
  SAVE_PRODUCT,
  IMAGES,
  MAIN_PHOTO,
  NAME,
  OLD_PRICE,
  SELLER,
  IS_PRODUCT_NEW,
} from "@/constants/Form";
import { PRICE } from "@/constants/Product";
import { GREEN_LINE } from "@/constants/Global";
import { CHOOSE_CATEGORY } from "@/constants/Categories";

export default function AddProductForm() {
  const [description, setDescription] = useState("");
  const [productIsNew, setProductIsNew] = useState(false);
  const [mount, setMount] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    if (!description) {
      toast.error(DESCRIPTION_IS_REQUIRED);
      return;
    }
    const images = Array.from(formData.getAll("images"));

    if (images.length > 3) {
      toast.error(MAXIMUM_SIX_IMAGES_ALLOWED);
      return;
    }

    formData.set("description", description);
    formData.set("productIsNew", productIsNew.toString());

    try {
      setLoading(true);
      const res = await fetch("/api/products/add", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.status === 201) {
        toast.success(PRODUCT_ADDED);
        form.reset();
        setDescription("");
        setProductIsNew(false);
      } else {
        toast.error(data.message || "error occurred while creating product");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    mount && (
      <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-5">
        <div className="w-full mx-auto border border-gary-400 p-5">
          <form onSubmit={handleSubmit} className="mx-auto">
            <Input id="name" labelName={NAME} type="text" />
            <div className="grid md:grid-cols-2 md:gap-6">
              <Input
                id="oldPrice"
                labelName={OLD_PRICE}
                type="number"
                isRequired={false}
              />
              <Input id="price" labelName={PRICE} type="number" />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <Input
                id="photo"
                labelName={MAIN_PHOTO}
                type="file"
                accept="image/*"
              />
              <Input
                id="images"
                labelName={IMAGES}
                type="file"
                multiple
                accept="image/*"
              />
            </div>
            <Input
              id="seller"
              labelName={SELLER}
              type="text"
              defaultValue={GREEN_LINE}
            />
            <SelectInput labelName={CHOOSE_CATEGORY} id="category" />
            <div>
              <label className="inline-flex items-center mb-5 cursor-pointer">
                <input
                  name="productIsNew"
                  type="checkbox"
                  checked={productIsNew}
                  onChange={() => setProductIsNew((prev) => !prev)}
                  className="sr-only peer"
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all peer-checked:bg-green-500"></div>
                <span className="ms-3 text-lg font-medium text-gray-900">
                  {IS_PRODUCT_NEW}
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`${
                loading && "cursor-not-allowed opacity-40"
              } text-white my-4 font-semibold duration-200 bg-green-500 hover:bg-green-700 focus:outline-none rounded-lg text-lg w-full sm:w-auto px-5 py-2 text-center`}
            >
              {SAVE_PRODUCT}
            </button>
          </form>
        </div>
        <div className="w-full mx-auto h-[500px] xl:h-full">
          <ReactQuill
            theme="bubble"
            className="border-2 w-full border-gray-200 flex-1 h-full overflow-y-auto"
            value={description}
            onChange={setDescription}
          />
        </div>
      </div>
    )
  );
}
