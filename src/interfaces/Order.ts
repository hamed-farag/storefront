import UUID from "../types/UUID";

export interface OrderProduct {
    id: UUID;
    quantity: number;
}

export interface Order {
    id?: UUID;
    userId: UUID;
    status: string;
    products: OrderProduct[];
}
