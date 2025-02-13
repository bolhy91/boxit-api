import {IProductRepository} from "../../../domain/repository/IProductRepository";

export class RemoveByIdProductUseCase {
    constructor(private productRepository: IProductRepository) {
    }

    async execute(id: number) {
        return this.productRepository.removeById(id);
    }
}