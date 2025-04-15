import { OrderStatus } from "../enum/OrderStatus";
import { PaymentStatus } from "../enum/Paid";
import { OrderDetail } from "./OrderDetails";

export interface Order {
    id: string
    address: string;
    apartment: string;
    discount: number;
    estimatedTime: string;
    paid: PaymentStatus;
    state: OrderStatus;
    isCanceled: boolean;
    phone: string;
    total: number;
    userId: number;
    userName: string;
    userLastName: string;
    deliveryMethod: string;
    paymentType: string;
    dateTime: string | Date| null;  
    orderDetails: OrderDetail[];
}