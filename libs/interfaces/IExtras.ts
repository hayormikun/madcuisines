export interface IExtras {
    extraId: string
    name: string
    description: string
    images: {imageUrl: string}[]
    dateCreated: string 
}

export interface IExtra {
    name: string
    description: string
    images: File[]
    categoryId: string 
    unitOfMeasurement: string
    quantityAvailable: string
    unitPrice: string
    unitSale: string
    material: string
    note: string
    falsePrice: string
    minOrder: string
    falseprice: string
    productId: string
}