import {Product} from "../../domain/models/product";
import {IProductRepository} from "../../domain/repository/IProductRepository";

export class ProductRepositoryImpl implements IProductRepository {
    getProducts(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

    getProductById(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    createProduct(product: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    updateProduct(id: number, product: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    removeById(id: number): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
}