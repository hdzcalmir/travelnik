"use client";

import { useTranslations } from "next-intl";

interface StarRatingProps {
  calculatedRate: number;
}

const StarRating = ({ calculatedRate }: StarRatingProps) => {
  const t = useTranslations("Reviews");
  const filledStars = Math.floor(calculatedRate);
  const hasHalfStar = calculatedRate % 1 !== 0;

  return (
    <div className="flex flex-wrap items-center mt-2 mb-1 space-x-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={
              star < filledStars || (star === filledStars && hasHalfStar)
                ? "currentColor"
                : "none"
            }
            stroke="currentColor"
            className="w-6 h-6 dark:text-yellow-500"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
        ))}
      </div>
      <span className="dark:text-gray-400">
        {calculatedRate.toFixed(2)} {t("out of 5")}
      </span>
    </div>
  );
};

export default StarRating;
