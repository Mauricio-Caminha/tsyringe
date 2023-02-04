import { SpecificationsRepository } from "../../repositories/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export default (): ListSpecificationsController => {
    const specificationsRepository = new SpecificationsRepository();
    const listSpecificationsUseCase = new ListSpecificationUseCase(specificationsRepository);
    const listSpecificationsController = new ListSpecificationsController(listSpecificationsUseCase);

    return listSpecificationsController;
}