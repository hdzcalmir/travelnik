"use client";
import { useTimer } from "react-timer-hook";

interface TimerProps {
  expiryTimestamp: Date;
}

const Timer = ({ expiryTimestamp }: TimerProps) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="mx-auto lg:mr-10 bg-gray-200 dark:bg-primaryColor border-8 border-gray-600 dark:border-secondaryColor drop-shadow-lg m-4 p-2 rounded-full lg:w-40 lg:h-40 h-72 w-72 flex flex-col items-center justify-center shadow-lg">
      <h1 className="mt-3 text-3xl lg:text-2xl text-primaryColor dark:text-gray-100">
        {hours}:{minutes}:{seconds}
      </h1>
      <button className="text-white bg-red-400 rounded-lg px-4 py-2 text-lg lg:text-md">
        Stop
      </button>
    </div>
  );
};

export default Timer;
