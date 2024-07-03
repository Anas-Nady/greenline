"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderImg from "react-slick";
import Card from "./Card";
import { TESTIMONIALS_RATINGS } from "@/constants/Testimonials";

export default function Slider() {
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    dots: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <SliderImg {...settings} className="mt-5 mb-10 py-5">
        {TESTIMONIALS_RATINGS.map((card, i) => (
          <Card cardInfo={card} key={i} />
        ))}
      </SliderImg>
    </>
  );
}
