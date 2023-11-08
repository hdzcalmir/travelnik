import { IActivity } from "./IActivity";
import { IEvent } from "./IEvent";
import { IVenture } from "./IVenture";

export interface Location {
    ventures: Array<IVenture>,
    events: Array<IEvent>,
    activtiy: Array<IActivity>
}