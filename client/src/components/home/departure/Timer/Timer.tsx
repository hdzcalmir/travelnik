// Timer.tsx
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addActivity, updateActivities } from '@/redux/actions';
import { IActivity } from '@/common/interfaces/IActivity';
import { Utils } from '@/common/utils';

interface TimerProps {
  expiryTimestamp: Date;
  currentActivity: IActivity | undefined;
}

const Timer: React.FC<TimerProps> = ({ expiryTimestamp, currentActivity }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const currentActivities: Partial<IActivity>[] = useSelector((state: RootState) => state.currentActivities);

  const [timeRemaining, setTimeRemaining] = useState(() => Utils.calculateTimeRemaining(expiryTimestamp));
  const isTimerDone = useRef(false);
  const [stopTimer, setStopTimer] = useState(false);

  const stopActivity = useCallback((): void => {
    const isActivityInserted = currentActivities.some(activity => activity.id === currentActivity?.id);
    const currentStatus = Utils.getCurrentStatus(isTimerDone.current);

    if (isActivityInserted) {
      const updatedActivities = Utils.updateExistingActivity(currentActivities as IActivity[], currentActivity, () => currentStatus);

      updatedActivities.forEach(updatedActivity => {
        const { id, status } = updatedActivity;
        if (id) {
          Utils.updateActivityStatus(dispatch, updateActivities, id, status);
        }
      });
    } else {
      Utils.addNewActivity(dispatch, addActivity, currentActivity as IActivity, isTimerDone.current);
    }

    Utils.redirectToDeparture(router, searchParams);
  }, [currentActivities, dispatch, router, currentActivity, searchParams]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stopTimer) {
        clearInterval(intervalId);
        return;
      }

      const remaining = Utils.calculateTimeRemaining(expiryTimestamp);
      setTimeRemaining(remaining);

      if (!isTimerDone.current && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        console.log('Timer is done!');
        isTimerDone.current = true;
        stopActivity();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiryTimestamp, stopTimer, stopActivity]);

  const handleStopClick = () => {
    setStopTimer(!stopTimer);
    stopActivity();
  };

  const { hours, minutes, seconds } = timeRemaining;

  return (
    <div className="mx-auto ml-2 lg:mr-10 bg-gray-200 dark:bg-primaryColor border-8 border-gray-600 dark:border-secondaryColor drop-shadow-lg m-4 p-2 rounded-full lg:w-40 lg:h-40 h-40 min-w-[10rem] flex flex-col items-center justify-center shadow-lg">
      <h1 className="mt-3 text-2xl text-primaryColor dark:text-gray-100">
        {`${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
      </h1>
      <button onClick={handleStopClick} className={`text-white bg-red-400 rounded-lg px-4 py-2 text-sm lg:text-md`}>
        Stop
      </button>
    </div>
  );
};

export default Timer;
