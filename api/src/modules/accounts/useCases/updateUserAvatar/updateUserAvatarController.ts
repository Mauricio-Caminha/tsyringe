import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./updateUserAvatarUseCase";

class UpdateUserAvatarController {
    async handle(request: Request, response: Response) {
        const { id } = request.user;

        const updateUserAvatarUseCase = container.resolve(
            UpdateUserAvatarUseCase
        );

        const avatarFile = null;

        await updateUserAvatarUseCase.execute({ userId: id, avatarFile });

        return response.status(204).send();
    }
}

export { UpdateUserAvatarController };
