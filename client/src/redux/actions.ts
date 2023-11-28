import { IActivity } from "@/common/interfaces/IActivity";

export const addActivity = (activity: Partial<IActivity>) => ({
    type: 'ADD_ACTIVITY' as const,
    payload: activity,
});