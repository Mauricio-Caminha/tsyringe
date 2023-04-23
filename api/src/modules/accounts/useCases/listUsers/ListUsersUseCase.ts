import { inject, injectable } from "tsyringe";

import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository
    ) {}

    async execute(): Promise<User[]> {
        const users = await this.userRepository.list();

        return users;
    }
}

export { ListUsersUseCase };
