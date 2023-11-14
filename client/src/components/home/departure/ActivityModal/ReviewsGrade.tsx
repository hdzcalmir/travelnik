"use client";

import { IReview } from "@/common/interfaces/IReview";
import { Utils } from "@/common/utils";
import { useTranslations } from "next-intl";

interface ReviewsGradeProps {
  grade: number;
  reviews: IReview[];
}

const ReviewsGrade = ({ grade, reviews }: ReviewsGradeProps) => {
  const percentage = Utils.calculatePercentageOfGradeReviews(grade, reviews);
  const t = useTranslations("Reviews");

  return (
    <div className="flex flex-col mt-4">
      {reviews && (
        <div className="flex items-center space-x-1">
          <span className="flex-shrink-0 w-18 text-sm">{grade} {t("star")}</span>
          <div className="flex-1 h-4 overflow-hidden rounded-sm dark:bg-gray-700">
            <div
              className="dark:bg-orange-300 h-4"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="flex-shrink-0 w-12 text-sm text-right">
            {percentage.toFixed(0)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ReviewsGrade;
