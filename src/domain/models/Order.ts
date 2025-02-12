import {User} from "./User";

export class Order {
    constructor(
        public id: number,
        public user: User,
        public date: Date,
        public total: number,
    ) {
    }
}
