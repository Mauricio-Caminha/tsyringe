import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "../modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

const upload = multer({
    dest: "avatar",
});

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    upload.single("file"),
    updateUserAvatarController.handle
);

usersRoutes.get("/", listUsersController.handle);

export { usersRoutes };
