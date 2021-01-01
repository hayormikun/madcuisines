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
    description: string
    images: File
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