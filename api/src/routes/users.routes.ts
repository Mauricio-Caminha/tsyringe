import { Router } from "express";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { ListUsersController } from "@modules/accounts/useCases/listUsers/ListUsersController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/updateUserAvatarController";

import uploadConfig from "../config/upload";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

usersRoutes.get("/", listUsersController.handle);

export { usersRoutes };
