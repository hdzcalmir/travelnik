import { IActivity } from "./IActivity";
import { IEvent } from "./IEvent";
import { IVenture } from "./IVenture";

export interface ILocation {
    ventures: Array<IVenture>,
    events: Array<IEvent>,
    activities: Array<IActivity>
}