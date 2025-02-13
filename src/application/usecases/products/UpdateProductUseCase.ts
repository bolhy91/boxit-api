import {IProductRepository} from "../../../domain/repository/IProductRepository";
import {Product} from "../../../domain/models/product";

export class UpdateProductUseCase {
    constructor(private productRepository: IProductRepository) {
    }

    async execute(id: number, product: Product) {
        return this.productRepository.updateProduct(id, product);
    }
}