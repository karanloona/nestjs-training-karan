export class ProductsResponseDTO{
    products:any;
    total:number;
    skip:number;
    limit:number;
}

export class Product {
    id?: number;
    title?: string;
    description?:string;
    price?:number;
    discountPercentage?:number;
    rating?:string;
    stock?:string;
    brand?:string;
    category?:string;
    thumbnail?:string;
    images?:string[];
}


