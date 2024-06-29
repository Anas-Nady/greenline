import { TestimonialsCardProps } from "@/types/Testimonials";
import { starIcon, userCircleIcon } from "../Icons";

export default function Card({
  cardInfo,
}: {
  cardInfo: TestimonialsCardProps;
}) {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < cardInfo.numberOfRatings; i++) {
      stars.push(
        <span key={i} className="text-yellow-300">
          {starIcon}
        </span>
      );
    }
    return stars;
  };

  return (
    <div
      title={cardInfo.comment}
      className="group max-w-[470px] relative cursor-default overflow-hidden bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:mx-auto sm:max-w-1/3 sm:rounded-lg sm:px-10"
    >
      <span className="absolute top-10 z-0 h-20 w-20 rounded-full bg-green-500 transition-all duration-300 group-hover:scale-[12]"></span>
      <div className="relative z-10 mx-auto max-w-md">
        <div className="flex gap-2 items-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-green-500 transition-all duration-300 group-hover:bg-green-400">
            {userCircleIcon}
          </span>
          <span className="text-gray-800 text-lg font-medium group-hover:text-white/90 group-hover:font-semibold">
            {cardInfo.username}
          </span>
        </div>
        <div className="space-y-6 h-[100px] line-clamp-3 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90 group-hover:font-semibold">
          <p>{cardInfo.comment}</p>
        </div>
        <div className="pt-5 flex gap-1 items-center">{renderStars()}</div>
      </div>
    </div>
  );
}
