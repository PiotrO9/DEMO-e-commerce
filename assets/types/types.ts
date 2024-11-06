export type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    imageLink: string;
    rating: number;
    ratingsQuantity: number;
};

export interface PaginationModel {
    totalPages: number;
    currentPage: number;
}
