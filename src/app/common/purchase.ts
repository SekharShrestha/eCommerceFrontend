import { Address } from "./address";
import { Customer } from "./customer";
import { OrderItem } from "./order-item";
import { Order } from "./orders";

export class Purchase {
    customer: Customer;
    shippingAddress: Address;
    order: Order;
    orderItems: OrderItem[];
}
