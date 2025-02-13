import {Product} from "./product";

export class OrderDetail {
    constructor(
        public id: number,
        public orderId: number,
        public product: Product,
        public quantity: number,
        public priceUnit: number,
    ) {
    }
}
