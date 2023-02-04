import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/implementations/ISpecificationsRepository";

class ListSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) { }

    async execute(): Promise<Specification[]> {
        const specifications = await this.specificationRepository.list();

        return specifications;
    }
}

export { ListSpecificationUseCase };