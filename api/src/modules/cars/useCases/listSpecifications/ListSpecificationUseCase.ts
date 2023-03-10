import { inject, injectable } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

@injectable()
class ListSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationRepository: ISpecificationRepository
    ) {}

    async execute(): Promise<Specification[]> {
        const specifications = await this.specificationRepository.list();

        return specifications;
    }
}

export { ListSpecificationUseCase };
