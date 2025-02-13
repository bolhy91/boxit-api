import {Router} from "express";

export class AppRoute {
    protected readonly route: Router;

    constructor() {
        this.route = Router();
    }

    public getRouter(): Router {
        return this.route;
    }
}