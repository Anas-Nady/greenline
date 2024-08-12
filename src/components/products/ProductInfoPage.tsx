"use client";
import { ProductProps } from "@/types/Product";
import Image from "next/image";
import { HTMLContent } from "@/types/types";
import {
  DESCRIPTION,
  ORDER_BY_WHATSAPP,
  PRICE,
  SAR,
  SOLD_BY,
} from "@/constants/Product";
import { CLIENT_URL, WHATSAPP_NUMBER } from "@/constants/Data";

import { useEffect, useState } from "react";
import Link from "next/link";
import formatPrice from "@/helpers/formatPrice";
import { closePopupIcon, whatsappIcon } from "../Icons";

export default function ProductInfo({
  product,
  isDashboard,
}: {
  product: ProductProps;
  isDashboard: boolean;
}) {
  const [currentProductPhoto, setCurrentProductPhoto] = useState(
    product?.photo
  );
  const [viewProductPhoto, setViewProductPhoto] = useState(false);

  useEffect(() => {
    if (viewProductPhoto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewProductPhoto]);

  const handleSwitchBetweenProductImages = (url: string) => {
    setCurrentProductPhoto(url);
  };

  const pageURL = `${CLIENT_URL}/products/${product._id}`;

  return (
    <>
      {viewProductPhoto && (
        <div className="absolute w-full h-[90%] mx-5 bg-white z-40 pb-5">
          <span
            onClick={() => setViewProductPhoto(false)}
            className="absolute top-1 left-9 font-bold text-xl text-red-500 hover:bg-white border border-gray-400 hover:border-gray-300 duration-200 bg-gray-200 rounded-full w-11 h-11 mx-auto text-center py-3 cursor-pointer"
          >
            {closePopupIcon}
          </span>
          <Image
            className=" w-[70%] h-[50%] px-[10px] mx-auto my-5 object-contain"
            src={currentProductPhoto}
            alt={product.name}
            width="650"
            height="500"
          />
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handleSwitchBetweenProductImages(product.photo)}
            >
              <Image
                className={`block duration-200 ${
                  product.photo === currentProductPhoto
                    ? "border-green-400"
                    : "opacity-50"
                } w-[100px] h-[100px] object-contain border-2 rounded p-3 cursor-pointer`}
                height="100"
                width="100"
                src={product.photo}
                alt={product.name}
              />
            </button>
            {product.images.map((img, i) => (
              <div className="ml-4 mt-2 bg-white" key={i}>
                <button
                  onClick={() => handleSwitchBetweenProductImages(img.url)}
                >
                  <Image
                    className={`block w-[100px] h-[100px] duration-200 object-contain border-2 ${
                      img.url === currentProductPhoto
                        ? "border-green-400"
                        : "opacity-50"
                    } rounded p-3 cursor-pointer`}
                    height="100"
                    width="100"
                    src={img.url}
                    alt={product.name}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex min-h-[calc(100vh-135px)] justify-center flex-col lg:flex-row lg:justify-start items-center lg:items-start gap-5 flex-wrap container py-14">
        <div className="flex-1 p-3">
          <Image
            className="block object-contain border w-[650px] h-[500px] px-[10px] cursor-pointer"
            src={currentProductPhoto}
            alt={product.name}
            onClick={() => setViewProductPhoto(true)}
            width="650"
            height="500"
          />
          <div className="flex justify-start mt-5">
            <div className="ml-4 mt-2">
              <button
                onClick={() => handleSwitchBetweenProductImages(product.photo)}
              >
                <Image
                  className={`block duration-200 ${
                    product.photo === currentProductPhoto
                      ? "border-green-400"
                      : "opacity-50"
                  } w-[100px] h-[100px] object-contain border-2 rounded p-3 cursor-pointer`}
                  height="100"
                  width="100"
                  src={product.photo}
                  alt={product.name}
                />
              </button>
            </div>
            {product.images.map((img, i) => (
              <div className="ml-4 mt-2" key={i}>
                <button
                  onClick={() => handleSwitchBetweenProductImages(img.url)}
                >
                  <Image
                    className={`block w-[100px] h-[100px]  duration-200 object-contain border-2 ${
                      img.url === currentProductPhoto
                        ? "border-green-400"
                        : "opacity-50"
                    } rounded p-3 cursor-pointer`}
                    height="100"
                    width="100"
                    src={img.url}
                    alt={product.name}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex-1 lg:mt-0 px-8 lg:px-0">
          <h1 className="text-2xl md:text-3xl py-2 font-semibold">
            {product.name}
          </h1>
          <hr />

          <p className="my-4 text-green-500 font-bold text-lg">
            {PRICE}: {formatPrice(product.price)} {SAR}
          </p>

          <hr />

          <h4 className="mt-2 text-xl lg:text-2xl font-bold">{DESCRIPTION}:</h4>

          <div
            className="text-base py-2 leading-relaxed overflow-hidden w-full"
            dangerouslySetInnerHTML={
              { __html: product.description } as HTMLContent
            }
          />

          <hr />
          <p className="my-5 text-md">
            {SOLD_BY}:{" "}
            <strong className="text-green-500">{product.seller}</strong>
          </p>

          {!isDashboard && (
            <Link
              className="px-3 flex gap-1 items-center w-fit py-2 bg-green-500 rounded text-white font-semibold hover:scale-[0.98] hover:bg-green-400 duration-300"
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                pageURL
              )}`}
              target="_blank"
            >
              <span>{ORDER_BY_WHATSAPP}</span>
              <span className="w-6 h-6">{whatsappIcon}</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
