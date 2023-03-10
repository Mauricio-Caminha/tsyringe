import { Request, response, Response } from "express";
import { container } from "tsyringe";

import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listUsersUseCase = container.resolve(ListUsersUseCase);

        const allUsers = await listUsersUseCase.execute();

        return response.json(allUsers);
    }
}

export { ListUsersController };
