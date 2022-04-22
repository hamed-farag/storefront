export interface ProductFullInterface {
    id: string;
    name: string;
    price: number;
    categoryId: number;
}

export interface ProductInterface {
    name: string;
    price: number;
    categoryId: number;
}

export interface ProductReturnType extends ProductFullInterface {}
