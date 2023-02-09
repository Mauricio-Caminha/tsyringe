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

        if (userAlreadyExists) {
            throw new Error("This user already exists!");
        }

        await this.usersRepository.create(data);
    }
}

export { CreateUserUseCase };
