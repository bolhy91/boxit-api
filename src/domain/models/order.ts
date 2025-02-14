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
    toString(): string {
        return `Order ID: ${this.id}, User: ${this.user.name}, Date: ${this.date}, Total: ${this.total}, Items: [${this.items.map(item => item.toString()).join(', ')}]`;
    }
}
