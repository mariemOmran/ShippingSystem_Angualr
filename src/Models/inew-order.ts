export interface InewOrder {
    clientName:string,
    status:string,
    totalPrice:number,
    totalWeight:number,
    phoneOne:string,
    phoneTwo:string,
    email:string,
    notes:string,
    streetAndVillage:string,
    ifVillage:boolean,
    merchantID:number,
    shippingTypeID:number,
    paymentTypeID:number,
    products: Array<{
        name: string;
        price: number;
        weight: number;
        quantity: number;
      }>
}
