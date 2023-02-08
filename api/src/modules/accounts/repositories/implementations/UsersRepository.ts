import { getRepository, Repository } from "typeorm";

import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async findByName(name: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    async list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async create(data: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create({
            name: data.name,
            username: data.username,
            password: data.password,
            email: data.email,
            driver_license: data.driver_license,
        });

        await this.repository.save(user);
    }
}

export { UsersRepository };
