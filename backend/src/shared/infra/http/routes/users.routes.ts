import { Router } from "express";

import { uploadSingle } from "../../../../config/upload";
import { Multer } from "../../../../config/multerConfig";
import ensureAuthenticated from "../middlewares/auth";

import { CreateUserController } from "../../../../modules/users/controllers/CreateUserController";
import { SessionUserController } from "../../../../modules/users/controllers/SessionUserController";
import { UpdateUserController } from "../../../../modules/users/controllers/UpdateUserController";
import { UpdateAvatarUserController } from "../../../../modules/users/controllers/UpdateAvatarUserController";

const usersRoutes = Router();

const updateUserController = new UpdateUserController();
const updateAvatarUserController = new UpdateAvatarUserController();
const sessionUserController = new SessionUserController();
const createUserController = new CreateUserController();

// Create User User
usersRoutes.post(
  "/",
  Multer.single("avatar"),
  uploadSingle,
  createUserController.handle
);

// Update Avatar, Name, Email, Address, Phone
usersRoutes.put(
  "/",
  ensureAuthenticated,
  Multer.single("avatar"),
  uploadSingle,
  updateUserController.handle
);

// Update Avatar User User
usersRoutes.patch(
  "/",
  ensureAuthenticated,
  Multer.single("avatar"),
  uploadSingle,
  updateAvatarUserController.handle
);

// Login User
usersRoutes.post("/login", sessionUserController.create);

export { usersRoutes };
