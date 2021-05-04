export interface Product{
    id:string;
    name: string;
    price: number;
    dealer: string;
    ramTypes: string;
    processor: string;
    priceQty?: number
    // available: boolean
}