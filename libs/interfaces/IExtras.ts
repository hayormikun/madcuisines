export interface IExtras {
    extraId: string
    name: string
    description: string
    images: {imageUrl: string}[]
    type: string
    category: {
        categoryId: string
        description: string
        name: string
        status: string
    }
    unitOfMeasurement: string
    quantityAvailable: string
    status: string
    unitPrice: string
    falsePrice: string
    minOrder: string
    dateCreated: string 
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