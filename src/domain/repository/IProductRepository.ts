import {Product} from "../models/product";

export interface IProductRepository {
    getProducts(): Promise<Product[]>;

    getProductById(id: number): Promise<Product | null>;

    createProduct(product: Product): Promise<Product>

    updateProduct(id: number, product: Product): Promise<Product>

    removeById(id: number): Promise<Boolean>
}