export interface IReview {
    id: number;
    entity_id: number;
    entity_type: string;
    name: string;
    date: string;
    text: string;
    rate: number;
    images: [];
    approved: number;
}