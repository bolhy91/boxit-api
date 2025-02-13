import {User} from "./user";

export class Auth {
    constructor(
        public accessToken: string,
        public sub: string,
    ) {
    }
}