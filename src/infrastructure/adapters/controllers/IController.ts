export type IRequest = {
    payload: any
    params: any
    query: any
}

export type IResponse = {
    status: number
    payload: any
}

export interface IController {
    findAll(req: IRequest): Promise<IResponse>

    findById(req: IRequest): Promise<IResponse>

    create(req: IRequest): Promise<IResponse>

    update(id: number, req: IRequest): Promise<IResponse>

    remove(id: number, req: IRequest): Promise<IResponse>
}