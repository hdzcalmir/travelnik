import React, { useCallback, useEffect, useRef, useState } from 'react';

interface TimerProps {
  expiryTimestamp: Date;
}

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

const Timer: React.FC<TimerProps> = ({ expiryTimestamp }) => {
  const calculateTimeRemaining = useCallback((): TimeRemaining => {
    const totalSeconds = Math.max(0, Math.floor((expiryTimestamp.getTime() - Date.now()) / 1000));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { hours, minutes, seconds };
  }, [expiryTimestamp]);

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() => calculateTimeRemaining());
  const isTimerDone = useRef(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (!isTimerDone.current && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        console.log('Timer is done!');
        isTimerDone.current = true;
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryTimestamp, calculateTimeRemaining]);

  const { hours, minutes, seconds } = timeRemaining;

  return (
    <div className="mx-auto lg:mr-10 bg-gray-200 dark:bg-primaryColor border-8 border-gray-600 dark:border-secondaryColor drop-shadow-lg m-4 p-2 rounded-full lg:w-40 lg:h-40 h-72 w-72 flex flex-col items-center justify-center shadow-lg">
      <h1 className="mt-3 text-3xl lg:text-2xl text-primaryColor dark:text-gray-100">
        {`${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
      </h1>
      <button className="text-white bg-red-400 rounded-lg px-4 py-2 text-lg lg:text-md">Stop</button>
    </div>
  );
};

export default Timer;
