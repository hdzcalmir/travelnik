export interface IVentureState {
    id?: string;
    name: string;
    category: string;
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    description: string;
    opening_time: string;
    closing_time: string
}

export interface IEventState {
    id?: string;
    name: string;
    category: string;
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    description: string;
    start_date: string;
    end_date: string;
}

export interface IActivityState {
    id?: string;
    name: string;
    category: string;
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    description: string;
    duration: string;
    difficulty: string;
}