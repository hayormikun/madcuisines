export interface IOrders {
    orderId: string
    orderNumber: string
    userId: string
    status: string
    totalAmount: string
    orderDate: Date 
    dueDate: Date
    user: {
        firstName: string,
        lastName: string
    }
}


export interface IOrder {
    orderId: string
    userId: string
    productId: string
    quantity: number
}