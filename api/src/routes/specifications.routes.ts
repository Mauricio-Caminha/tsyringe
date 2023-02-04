import { Router } from "express";

import createSpecificationController from "../modules/cars/useCases/createSpecification";
import listSpecificationsController from "../modules/cars/useCases/listSpecifications";

const specificationRoutes = Router();

// server.ts -> "/specifications" = routes.ts -> path inicial specifications
specificationRoutes.post("/", (request, response) => {
    return createSpecificationController().handle(request, response);
});

specificationRoutes.get("/", (request, response) => {
    return listSpecificationsController().handle(request, response);
});

export { specificationRoutes }