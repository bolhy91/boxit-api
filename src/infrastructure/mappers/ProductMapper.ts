import {IMapper} from "./IMapper";
import {Product} from "../../domain/models/product";
import {ProductEntity} from "../database/sql/entities/Product-entity";
import {model} from "mongoose";

export class ProductMapper implements IMapper<Product, ProductEntity> {

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

    dtoToDomainOrEntity(model: any): Product | ProductEntity {
        return new Product(0, model.name, model.price, model.stock, model.category);
    }

    updateToEntity(entity: ProductEntity, model: Product): ProductEntity {
        entity.name = model.name;
        entity.price = model.price;
        entity.stock = model.stock;
        entity.category = model.category
        return entity;
    }
}