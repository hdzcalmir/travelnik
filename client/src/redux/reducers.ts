import { IActivity } from "@/common/interfaces/IActivity";
import { addActivity, updateActivities } from "./actions";
import { UPDATE_ACTIVITIES } from "./types";

interface State {
    currentActivities: Partial<IActivity>[];
}

const initialState: State = {
    currentActivities: [],
};

export const activitiesReducer = (
    state: State = initialState,
    action: ReturnType<typeof addActivity> | ReturnType<typeof updateActivities>
): State => {
    switch (action.type) {
        case 'ADD_ACTIVITY':
            return {
                ...state,
                currentActivities: [...state.currentActivities, action.payload],
            };
        case UPDATE_ACTIVITIES:
            return {
                ...state,
                currentActivities: state.currentActivities.map((activity) =>
                    activity.id === action.payload.id
                        ? { ...activity, status: action.payload.status }
                        : activity
                ),
            };
        default:
            return state;
    }
};
