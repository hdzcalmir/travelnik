import { IReview } from "./IReview";

export interface IVenture {
    id?: string;
    name: string,
    reviews: IReview[];
    category: number,
    latitude: number,
    longitude: number,
    address: string,
    city: string,
    country: string,
    postal_code: string,
    description: string,
    opening_time: string,
    closing_time: string
}