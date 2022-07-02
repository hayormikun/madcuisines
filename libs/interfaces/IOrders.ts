// export type Priority =  'high' | 'normal' | 'low'

export interface IOrders {
    deliveryId: string
    orderId: string
    dispatcher: string
    priority: string
    receiver: string
    receiverPhone: string
    note: string
}

export interface IOrder {
    dispatcher: string
    priority: string
    receiver: string
    receiverPhone: string
    note: string
}