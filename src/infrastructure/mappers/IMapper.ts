export interface IMapper<D, E> {
    dtoToDomainOrEntity(model: any): D | E

    DomainToEntity(model: D): E

    entityToDomain(model: E): D

    updateToEntity(entity: E, model: D): E
}