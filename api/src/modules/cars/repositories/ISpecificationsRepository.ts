import { Specification } from "../entities/Specification";

interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationRepository {
    findByName(name: string): Promise<Specification>;
    list(): Promise<Specification[]>;
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}

export { ICreateSpecificationDTO, ISpecificationRepository };
