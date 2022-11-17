import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { petsRoutes } from "./pets.routes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/pets", petsRoutes);

router.use("/", (request, response) => response.json({ message: "API is running..." }));

export { router };
