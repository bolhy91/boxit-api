import {ProductRepositoryImpl} from "../../infrastructure/repository/ProductRepositoryImpl";
import {CreateProductUseCase} from "../usecases/products/CreateProductUseCase";
import {UpdateProductUseCase} from "../usecases/products/UpdateProductUseCase";
import {GetListProductUseCase} from "../usecases/products/GetListProductUseCase";
import {GetByIdProductUseCase} from "../usecases/products/GetByIdProductUseCase";
import {RemoveByIdProductUseCase} from "../usecases/products/removeByIdProductUseCase";
import {ProductController} from "../../infrastructure/adapters/controllers/ProductController";

export class ProductControllerFactory {
    static make() {
        const repository = new ProductRepositoryImpl()
        const createProductUseCase = new CreateProductUseCase(repository);
        const updateProductUseCase = new UpdateProductUseCase(repository);
        const getListProductUseCase = new GetListProductUseCase(repository);
        const getByIdProductUseCase = new GetByIdProductUseCase(repository);
        const removeByIdProductUseCase = new RemoveByIdProductUseCase(repository);
        return new ProductController(getListProductUseCase, getByIdProductUseCase, createProductUseCase, updateProductUseCase, removeByIdProductUseCase);
    }
}