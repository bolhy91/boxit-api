export class OrderFilter {
    constructor(
        public user: string | undefined
    ) {
        this.user = user || undefined
    }
}