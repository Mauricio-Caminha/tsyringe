import { Specification } from "../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "./implementations/ISpecificationsRepository";
import { getRepository, Repository } from "typeorm";

// Singleton -> Cria UMA instância GLOBAL -> não se usa para tudo

class SpecificationsRepository implements ISpecificationRepository {

    private repository: Repository<Specification>;

    private static INSTANCE: SpecificationsRepository;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description,
        });

        await this.repository.save(specification);
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();
        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specificationAlreadyExists = await this.repository.findOne({ name });
        return specificationAlreadyExists;
    }
}

export { SpecificationsRepository };