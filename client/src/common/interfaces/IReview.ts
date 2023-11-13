export interface IReview {
    id: number;
    name: string;
    date: string;
    text: string;
    rate: number;
    images: [];
    approved:boolean;
}