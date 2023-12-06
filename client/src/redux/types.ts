import { IActivity } from "@/common/interfaces/IActivity";

export const UPDATE_ACTIVITIES = 'UPDATE_ACTIVITIES';

export interface UpdateActivitiesAction {
    type: typeof UPDATE_ACTIVITIES;
    activities: IActivity[];
}

export const updateActivities = (activities: IActivity[]): UpdateActivitiesAction => ({
    type: UPDATE_ACTIVITIES,
    activities,
});