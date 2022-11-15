import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { petsRoutes } from "./pets.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/pets", petsRoutes);

export { router };
