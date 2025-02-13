import {User} from "./user";

export class Order {
    constructor(
        public id: number,
        public user: User,
        public date: Date,
        public total: number,
    ) {
    }
}
