import {Product} from "../../domain/models/product";
import {IProductRepository} from "../../domain/repository/IProductRepository";
import {ProductEntity} from "../database/sql/entities/Product-entity";
import {ProductMapper} from "../mappers/ProductMapper";
import {ItemNotFoundException} from "../../domain/exceptions/ItemNotFoundException";

export class ProductRepositoryImpl implements IProductRepository {
    productMapper: ProductMapper

    constructor() {
        this.productMapper = new ProductMapper()
    }

    async getProducts(): Promise<Product[]> {
        const products = await ProductEntity.findAll();
        return products.map(product => this.productMapper.entityToDomain(product));
    }

    async getProductById(id: number): Promise<Product | null> {
        const product = await ProductEntity.findByPk(id);
        if (product != null) {
            return this.productMapper.entityToDomain(product);
        }
        throw new ItemNotFoundException();
    }

    async createProduct(product: Product): Promise<Product> {
        const entity = this.productMapper.DomainToEntity(product);
        const orderModel = await entity.save();
        return this.productMapper.entityToDomain(orderModel);
    }

    async updateProduct(id: number, product: Product): Promise<Product> {
        const entity = await ProductEntity.findByPk(id);
        if (entity == null) throw new ItemNotFoundException();
        const mapper = this.productMapper.updateToEntity(entity, product);
        await mapper.save();
        return entity;
    }

    async removeById(id: number): Promise<Boolean> {
        const entity = await ProductEntity.findByPk(id);
        if (entity == null) throw new ItemNotFoundException();
        await ProductEntity.destroy({where: {id}});
        return true;
    }
}