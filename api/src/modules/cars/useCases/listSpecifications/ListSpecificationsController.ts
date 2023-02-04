import { Request, Response } from "express";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

class ListSpecificationsController {

    constructor(private listSpecificationUseCase: ListSpecificationUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const allSpecifications = await this.listSpecificationUseCase.execute();

        return response.json(allSpecifications);
    }
}

export { ListSpecificationsController };