export interface IExtras {
    id: string
    name: string
    category: string
    measurement: string
    quantity: number
    price: number
    bonus: number
    order: number
    description: string
    note: string
    material: string
    images: File[] | undefined
}

export interface IExtra {
    name: string
    category: string
    measurement: string
    quantity: number
    price: number
    bonus: number
    order: number
    description: string
    note: string
    material: string
    images: File[] | undefined
}