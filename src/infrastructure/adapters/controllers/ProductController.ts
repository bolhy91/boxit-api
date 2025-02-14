import {Request, Response} from "express";
import {CreateProductUseCase} from "../../../application/usecases/products/CreateProductUseCase";
import {UpdateProductUseCase} from "../../../application/usecases/products/UpdateProductUseCase";
import {GetListProductUseCase} from "../../../application/usecases/products/GetListProductUseCase";
import {GetByIdProductUseCase} from "../../../application/usecases/products/GetByIdProductUseCase";
import {RemoveByIdProductUseCase} from "../../../application/usecases/products/removeByIdProductUseCase";
import {CreateProductDTO} from "../dtos/CreateProductDTO";
import {RequestNotValidException} from "../../../domain/exceptions/RequestNotValidException";
import {ItemNotFoundException} from "../../../domain/exceptions/ItemNotFoundException";
import {Logger} from "../../database/mongodb/models/LogEntity";

export class ProductController {
    constructor(
        private getListProductUseCase: GetListProductUseCase,
        private getByIdProductUseCase: GetByIdProductUseCase,
        private createProductUseCase: CreateProductUseCase,
        private updateProductUseCase: UpdateProductUseCase,
        private removeByIdProductUseCase: RemoveByIdProductUseCase
    ) {
    }

    async findAll(req: Request, res: Response) {
        try {
            const products = await this.getListProductUseCase.execute();
            return res.status(200).json(products);
        } catch (e) {
            return res.status(500).end();
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const product = await this.getByIdProductUseCase.execute(Number(req.params.id));
            return res.status(200).json(product);
        } catch (e) {
            return res.status(500).json({error: e});
        }
    }

    async create(req: Request, res: Response) {
        try {
            const validator = CreateProductDTO.validate(req.body);
            const product = await this.createProductUseCase.execute(validator);
            await Logger.create({action: 'CREATE_PRODUCT', data: product.toString()});
            return res.status(201).json(product);
        } catch (e) {
            if (e instanceof RequestNotValidException) {
                await Logger.create({action: "ERROR_CREATE_PRODUCT_VALIDATION", data: e.message});
                return res.status(400).json({message: e.message});
            }
            await Logger.create({action: "ERROR_CREATE_PRODUCT", data: e});
            return res.status(500).json(e);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const validator = CreateProductDTO.validate(req.body);
            const product = await this.updateProductUseCase.execute(Number(req.params.id), validator);
            await Logger.create({action: 'UPDATE_PRODUCT', data: product});
            return res.status(200).json(product);
        } catch (e) {
            if (e instanceof RequestNotValidException) {
                return res.status(400).json({message: e.message});
            } else if (e instanceof ItemNotFoundException) {
                return res.status(404).json({message: e.message})
            }
            await Logger.create({action: 'ERROR_UPDATE_PRODUCT', data: e});
            return res.status(500).json(e);
        }
    }

    async removeById(req: Request, res: Response) {
        try {
            const result = await this.removeByIdProductUseCase.execute(Number(req.params.id));
            return res.status(200).json({message: "Success - Product Remove"});
        } catch (e) {
            if (e instanceof ItemNotFoundException) {
                return res.status(400).json({message: e.message});
            }
            return res.status(500).json(e);
        }
    }
}