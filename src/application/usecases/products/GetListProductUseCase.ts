import {IProductRepository} from "../../../domain/repository/IProductRepository";

export class GetListProductUseCase {
    constructor(private productRepository: IProductRepository) {
    }
    async execute() {
        return this.productRepository.getProducts();
    }
}