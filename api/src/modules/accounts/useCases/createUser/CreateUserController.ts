import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const data = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name: data.name,
            password: data.password,
            email: data.email,
            driver_license: data.driver_license,
        }); // or pass only data

        return response.status(201).send();
    }
}

export { CreateUserController };
