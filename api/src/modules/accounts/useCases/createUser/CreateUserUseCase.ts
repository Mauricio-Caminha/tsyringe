import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute(data: ICreateUsersDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByName(
            data.name
        );

        const passwordHash = await hash(data.password, 8);

        if (userAlreadyExists) {
            throw new Error("This user already exists!");
        }

        await this.usersRepository.create({
            name: data.name,
            password: passwordHash,
            email: data.email,
            driver_license: data.driver_license,
        });
    }
}

export { CreateUserUseCase };
