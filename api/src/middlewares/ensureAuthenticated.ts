import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@errors/AppError";
import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token is missing.", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: userId } = verify(
            token,
            "8420111445f26166edfb4f7bfec5e34e"
        ) as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new AppError("User not found!", 401);
        }

        request.user = {
            id: userId,
        };

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
