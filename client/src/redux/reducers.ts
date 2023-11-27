import { IActivity } from "@/common/interfaces/IActivity";
import { addActivity } from "./actions";

interface State {
    currentActivities: Partial<IActivity>[];
}

const initialState: State = {
    currentActivities: [],
};

export const activitiesReducer = (
    state: State = initialState,
    action: ReturnType<typeof addActivity>
): State => {
    switch (action.type) {
        case 'ADD_ACTIVITY':
            return {
                ...state,
                currentActivities: [...state.currentActivities, action.payload],
            };
        default:
            return state;
    }
};