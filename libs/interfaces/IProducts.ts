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
    images: File[]
    categoryId: string 
    unitOfMeasurement: string
    quantityAvailable: string
    unitPrice: string
    unitSale: string
    status: string
    material: string
    note: string
    falsePrice: string
    minOrder: string
}