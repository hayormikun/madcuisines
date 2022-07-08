
export interface IOrder {
    userId: string
    products: {productId: string, quantity: number}[]
}