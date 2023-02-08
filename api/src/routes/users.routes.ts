import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController(); 
const listUsersController = new ListUsersController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.get("/", listUsersController.handle);

export { usersRoutes };