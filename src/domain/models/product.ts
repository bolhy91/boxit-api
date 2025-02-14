export class Product {

    constructor(
        public id: number,
        public name: string,
        public price: number,
        public stock: number,
        public category: string
    ) {
    }

    toString(): string {
        return `Product [ID: ${this.id}, Name: ${this.name}, Price: ${this.price}, Stock: ${this.stock}, Category: ${this.category}]`;
    }
}
