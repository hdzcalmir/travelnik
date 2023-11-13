import { IReview } from "./IReview";

export interface IActivity {
    id?: string;
    location_id: number;
    reviews: IReview[];
    name: string,
    category: string,
    latitude: number,
    longitude: number,
    address: string,
    city: string,
    country: string,
    postal_code: string,
    description: string,
    duration: string,
    difficulty: string
}