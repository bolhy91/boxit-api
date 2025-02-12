import {Order} from "./Order";
import {Product} from "./Product";

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
