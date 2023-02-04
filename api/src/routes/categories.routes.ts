import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '../modules/cars/useCases/createCategory';
import importCategoryController from '../modules/cars/useCases/importCategory';
import listCategoriesController from '../modules/cars/useCases/listCategories';

const categoriesRoutes = Router();

// only read = multer()
const upload = multer({
    dest: './tmp',
});

// server.ts -> "/categories" = routes.ts -> path inicial categories
categoriesRoutes.post("/", (request, response) => {
    return createCategoryController().handle(request, response);
});

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesController().handle(request, response);
});

categoriesRoutes.post("/import", upload.single('file'), (request, response) => {
    return importCategoryController().handle(request, response);
});

export { categoriesRoutes };