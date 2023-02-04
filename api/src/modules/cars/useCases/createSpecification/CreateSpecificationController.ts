import { Request, Response } from "express";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {

    constructor(private CreateSpecificationUseCase: CreateSpecificationUseCase) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        await this.CreateSpecificationUseCase.execute({ name, description });

        return response.status(201).send();
    }
}

export { CreateSpecificationController };