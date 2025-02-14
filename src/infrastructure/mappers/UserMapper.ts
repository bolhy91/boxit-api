import {IMapper} from "./IMapper";
import {User} from "../../domain/models/user";
import {UserEntity} from "../database/sql/entities/User-entity";

export class UserMapper implements IMapper<User, UserEntity> {
    dtoToDomainOrEntity(model: any): User | UserEntity {
        const entity = new UserEntity();
        entity.email = model.email;
        entity.name = model.name;
        entity.password = model.password;
        return entity;
    }

    DomainToEntity(model: User): UserEntity {
        const entity = new UserEntity();
        entity.email = model.email;
        entity.name = model.name;
        entity.password = model.password;
        return entity;
    }

    entityToDomain(model: UserEntity): User {
        return new User(model.id, model.name, model.email, model.password);
    }

    updateToEntity(entity: UserEntity, model: User): UserEntity {
        return entity;
    }
}