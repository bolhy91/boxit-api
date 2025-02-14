import {IUserRepository} from "../../domain/repository/IUserRepository";
import {User} from "../../domain/models/user";
import {UserEntity} from "../database/sql/entities/User-entity";
import bcrypt from "bcrypt";
import {UserMapper} from "../mappers/UserMapper";

export class UserRepositoryImpl implements IUserRepository {
    private userMapper: UserMapper;

    constructor() {
        this.userMapper = new UserMapper();
    }

    async findByEmail(email: string): Promise<User | null> {
        return await UserEntity.findOne({where: [{email: email}]});
    }

    async save(user: User): Promise<User> {
        user.password = await bcrypt.hash(user.password, 10);
        const mapper = this.userMapper.DomainToEntity(user);
        const entity = await mapper.save();
        return this.userMapper.entityToDomain(entity);
    }
}