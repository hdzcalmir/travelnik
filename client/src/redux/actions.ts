import { IActivity } from "@/common/interfaces/IActivity";
import { UPDATE_ACTIVITIES } from "./types";
import { ActivityStatus } from "@/common/enums/activityStatus";

export const addActivity = (activity: Partial<IActivity>) => ({
    type: 'ADD_ACTIVITY',
    payload: activity,
});

export const updateActivities = (id: string, status: ActivityStatus) => ({
    type: UPDATE_ACTIVITIES,
    payload: { id, status },
});
