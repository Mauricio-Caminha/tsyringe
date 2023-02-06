import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    findByName(name: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    create(data: ICreateUsersDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export { UsersRepository };
