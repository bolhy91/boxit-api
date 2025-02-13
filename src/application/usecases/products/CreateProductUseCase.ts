import {IProductRepository} from "../../../domain/repository/IProductRepository";
import {Product} from "../../../domain/models/product";

export class CreateProductUseCase {
    constructor(private productRepository: IProductRepository) {
    }

    async execute(product: Product) {
        return this.productRepository.createProduct(product);
    }
}