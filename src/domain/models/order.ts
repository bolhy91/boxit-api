import {User} from "./user";
import {OrderDetail} from "./orderDetail";

export class Order {
    constructor(
        public id: number,
        public user: User,
        public date: string,
        public total: number,
        public items: OrderDetail[],
    ) {
    }
}
