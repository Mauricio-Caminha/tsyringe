import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create(data: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create(data);

        await this.repository.save(user);
    }

    async list(): Promise<User[]> {
        const users = await this.repository.find();
        return users;
    }

    async findByEmail(email: string): Promise<User> {
        const userAlreadyExists = await this.repository.findOne({ email });
        return userAlreadyExists;
    }
    async findById(id: string): Promise<User> {
        const userAlreadyExists = await this.repository.findOne(id);
        return userAlreadyExists;
    }
}

export { UsersRepository };
