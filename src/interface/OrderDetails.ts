import { Product } from "./Product";

export interface OrderDetail {
    id: string;
    quantity: number;
    subtotal: number;
    item: Product;
}