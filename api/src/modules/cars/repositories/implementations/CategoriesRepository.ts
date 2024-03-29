import { getRepository, Repository } from "typeorm";

import { Category } from "@modules/cars/entities/Category";

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

// Singleton -> Cria UMA instância GLOBAL -> não se usa para tudo
// DTO => Data Transfer Object
class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description,
        });

        await this.repository.save(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const categoryAlreadyExists = await this.repository.findOne({ name });
        return categoryAlreadyExists;
    }
}

export { CategoriesRepository };
