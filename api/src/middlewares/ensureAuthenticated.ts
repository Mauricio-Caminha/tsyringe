import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

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
        throw new Error("Token is missing.");
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: userId } = verify(
            token,
            "8420111445f26166edfb4f7bfec5e34e"
        ) as IPayload;

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(userId);

        if (!user) {
            throw new Error("User not found!");
        }

        next();
    } catch {
        throw new Error("Invalid token!");
    }
}
