"use client";

import { IActivity } from "@/common/interfaces/IActivity";
import { IReview } from "@/common/interfaces/IReview";
import { Utils } from "@/common/utils";
import ReviewsGrade from "./ReviewsGrade";
import StarRating from "./StarRating";

interface ReviewsCardProps {
  activity: IActivity | undefined;
}

const ReviewsCard = ({ activity }: ReviewsCardProps) => {
  const parsedReviews: IReview[] =
    activity?.reviews !== undefined
      ? JSON.parse(activity.reviews as unknown as string)
      : [];

  const calculatedRate = Utils.calculateRate(parsedReviews);

  return (
    <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-700 dark:text-gray-100">
      <div className="flex flex-col w-full">
        <h2 className="text-3xl font-semibold">Reviews</h2>
        <StarRating calculatedRate={calculatedRate} />
        <p className="text-sm dark:text-gray-400">
          {activity && activity.reviews ? parsedReviews.length : 0} global
          ratings
        </p>
        <div className="flex flex-col mt-4">
          {[5, 4, 3, 2, 1].map((grade) => (
            <ReviewsGrade key={grade} grade={grade} reviews={parsedReviews} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
