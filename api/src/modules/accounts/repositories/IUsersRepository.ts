import { ICreateUsersDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
    findByEmail(name: string): Promise<User>;
    findById(id: string): Promise<User>;
    list(): Promise<User[]>;
    create(data: ICreateUsersDTO): Promise<void>;
}

export { IUsersRepository };
