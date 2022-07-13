export interface IProducts {
    productId: string
    name: string
    description: string
    images: {imageUrl: string}[]
    dateCreated: string   
}

export interface IProduct {
    name: string
    description: string
    images: File
    category: {
        name: string
    }
    unitOfMeasurement: string
    quantityAvailable: string
    unitPrice: string
    falsePrice: string
    minOrder: string
}