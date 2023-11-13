"use client";

import { IActivity } from "@/common/interfaces/IActivity";
import { IReview } from "@/common/interfaces/IReview";
import { Utils } from "@/common/utils";
import ReviewsGrade from "./ReviewsGrade";
import StarRating from "./StarRating";
import { MdRateReview } from "react-icons/md";
import { useState } from "react";
import UserReviews from "./UserReviews";
import Feedback from "./Feedback";

interface ReviewsCardProps {
  activity: IActivity | undefined;
}

const ReviewsCard = ({ activity }: ReviewsCardProps) => {
  const [userReviews, setUserReviews] = useState<boolean>(false);

  const jsonParsedReviews: IReview[] =
    activity?.reviews !== undefined
      ? JSON.parse(activity.reviews as unknown as string)
      : [];

  const filterApprovedReviews = jsonParsedReviews.filter(
    (review) => review.approved === true
  );

  const calculatedRate = Utils.calculateRate(filterApprovedReviews);

  return (
    <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-700 dark:text-gray-100 h-[26rem]  overflow-y-auto scrollbar-hidden">
      <div className="flex flex-col w-full">
        <h2 className="text-3xl font-semibold">Reviews</h2>
        <StarRating calculatedRate={calculatedRate} />
        <p className="text-sm dark:text-gray-400">
          {activity && activity.reviews ? filterApprovedReviews.length : 0}{" "}
          global ratings
        </p>
        <div className="flex flex-col mt-4">
          {[5, 4, 3, 2, 1].map((grade) => (
            <ReviewsGrade
              key={grade}
              grade={grade}
              reviews={filterApprovedReviews}
            />
          ))}
        </div>
        <p
          onClick={() => setUserReviews(!userReviews)}
          className="mt-5 flex items-center underline text-gray-200 cursor-pointer hover:text-gray-400 transition duration-500"
        >
          <MdRateReview className="mr-2 w-5 h-5" /> See all reviews
        </p>
      </div>
      {userReviews && (
        <div className="mt-4 space-y-4">
          {filterApprovedReviews.map((review) => (
            <UserReviews key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsCard;
