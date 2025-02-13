import {Order} from "./order";
import {Product} from "./product";

export class OrderDetail {
    constructor(
        public id: number,
        public order: Order,
        public products: Product[],
        public quantity: number,
        public priceUnit: number,
    ) {
    }
}
