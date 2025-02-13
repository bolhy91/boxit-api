import {IMapper} from "./IMapper";
import {Product} from "../../domain/models/product";
import {ProductEntity} from "../database/sql/entities/Product-entity";

export class ProductMapper implements IMapper<Product, ProductEntity> {
    dtoToDomain(model: any): Product {
        return new Product(0, model.name, model.price, model.stock, model.category);
    }

    DomainToEntity(model: Product): ProductEntity {
        const entity = new ProductEntity();
        entity.name = model.name;
        entity.price = model.price;
        entity.stock = model.stock;
        entity.category = model.category;
        return entity;
    }

    entityToDomain(model: ProductEntity): Product {
        return new Product(model.id, model.name, model.price, model.stock, model.category);
    }
}