"use client";
import React, { useState } from "react";
import { IActivity } from "@/common/interfaces/IActivity";
import { IVenture } from "@/common/interfaces/IVenture";
import { IEvent } from "@/common/interfaces/IEvent";
import toast from "react-hot-toast";
import http from "@/interceptor/http";
import { useTranslations } from "next-intl";

interface FeedbackProps {
  data: IActivity | undefined | IVenture;
}

const Feedback = ({ data }: FeedbackProps) => {
  // State hooks
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const t = useTranslations("Reviews");

  // Function to handle star rating clicks
  const handleRatingClick = (selectedRating: any) => {
    setRating(selectedRating);
  };

  // Function to handle feedback submission
  const handleFeedbackSubmit = async () => {
    if (rating === 0) {
      toast.error(t("You need to select rating."));
      return;
    }
    if (name.length === 0) {
      toast.error(t("You need to enter your name."));
      return;
    }
    if (message.length === 0) {
      toast.error(t("You need to enter your message."));
      return;
    }
    if (
      (data as IActivity).difficulty !== undefined &&
      (data as IActivity).duration !== undefined
    ) {
      await http.post("/activity/review", {
        id: data?.id,
        name,
        message,
        rating,
      });
    }

    if (
      (data as IVenture).opening_time !== undefined &&
      (data as IVenture).closing_time !== undefined
    ) {
      await http.post("/business/review", {
        id: data?.id,
        name,
        message,
        rating,
      });
    }

    toast.success(t("Your feedback is successfully submited."));

    setName("");
    setMessage("");
    setRating(0);
  };

  return (
    <div className="flex flex-col max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-800 dark:text-gray-100">
      <div className="flex flex-col items-center w-full">
        <h2 className="text-3xl font-semibold text-center">
          {t("Your opinion matters!")}
        </h2>
        <div className="flex flex-col items-center py-6 space-y-3">
          <span className="text-center">{t("How was your experience?")}</span>
          <div className="flex space-x-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                title={`Rate ${star} stars`}
                aria-label={`Rate ${star} stars`}
                onClick={() => handleRatingClick(star)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-10 h-10 ${star <= rating
                    ? "dark:text-yellow-500"
                    : "dark:text-gray-600"
                    }`}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full space-y-4">
          <input
            type="text"
            name="name"
            placeholder={t("Enter your name")}
            className="p-4 rounded-md resize-none dark:text-gray-100 dark:bg-gray-700"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            rows={3}
            placeholder={t("Message...")}
            className="p-4 rounded-md resize-none dark:text-gray-100 dark:bg-gray-700"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="py-4 my-8 font-semibold rounded-md dark:text-white dark:bg-secondaryColor/80 hover:bg-secondaryColor transition duration-500"
            onClick={handleFeedbackSubmit}
          >
            {t("Leave feedback")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
