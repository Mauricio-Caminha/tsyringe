import { AppError } from "@errors/AppError";
import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUsersDTO = {
            name: "User Test",
            password: "123456",
            email: "user@test.com",
            driver_license: "000123",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an non-existent user", () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@test.com",
                password: "123456",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate an user with incorrect password", () => {
        expect(async () => {
            const user: ICreateUsersDTO = {
                name: "User Test",
                password: "123456",
                email: "user@test.com",
                driver_license: "000123",
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
