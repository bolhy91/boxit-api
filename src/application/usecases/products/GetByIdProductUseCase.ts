import {IProductRepository} from "../../../domain/repository/IProductRepository";

export class GetByIdProductUseCase {
    constructor(private productRepository: IProductRepository) {
    }
    async execute(id: number) {
        return this.productRepository.getProductById(id);
    }
}