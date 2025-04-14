import { Price } from "./Price";

export interface Product {
    id: string;
    denomination: string;
    description: string;
    availability: boolean;
    imageUrl: string;
    cookingTime: string | null;
    isManufactured: boolean;
    categoryId: string;
    price: Price;
}
