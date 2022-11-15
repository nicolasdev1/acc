import { Router } from "express";

import { Multer } from "../../../../config/multerConfig";

import ensureAuthenticated from "../middlewares/auth";

import { CreatePetController } from "../../../../modules/pets/controllers/CreatePetController";
import { ListPetsForAdoption } from "../../../../modules/pets/controllers/ListPetsForAdoption";
import { ListMyPetsController } from "../../../../modules/pets/controllers/ListMyPetsController";
import { ListPetsByOwnerController } from "../../../../modules/pets/controllers/ListPetsByOwnerController";
import { DeletePetController } from "../../../../modules/pets/controllers/DeletePetController";
import { RequestPetVisitController } from "../../../../modules/pets/controllers/RequestPetVisitController";
import { ListRequestedVisitsController } from "../../../../modules/pets/controllers/ListRequestedVisitsController";
import { ListReceivedVisitsController } from "../../../../modules/pets/controllers/ListReceivedVisitsController";
import { ListAllPetsController } from "../../../../modules/pets/controllers/ListAllPetsController";
import { RejectAdoptionController } from "../../../../modules/pets/controllers/RejectAdoptionController";
import { ConfirmAdoptionController } from "../../../../modules/pets/controllers/ConfirmAdoptionController";

import { uploadArray } from "../../../../config/upload";

const petsRoutes = Router();

const petsController = new CreatePetController();
const lisPetForAdoptionController = new ListPetsForAdoption();
const listMyPetsController = new ListMyPetsController();
const listPetsByOwnerController = new ListPetsByOwnerController();
const deletePetController = new DeletePetController();
const requestPetVisitController = new RequestPetVisitController();
const listRequestedVisitsController = new ListRequestedVisitsController();
const listReceivedVisitsController = new ListReceivedVisitsController();
const listAllPetsController = new ListAllPetsController();
const rejectAdoptionController = new RejectAdoptionController();
const confirmAdoptionController = new ConfirmAdoptionController();

// List Pets for Adoption
petsRoutes.get("/adoption", lisPetForAdoptionController.handle);

// Reject Adoption
petsRoutes.post(
  "/adoption/reject",
  ensureAuthenticated,
  rejectAdoptionController.handle
);

// Confirm Adoption
petsRoutes.post(
  "/adoption/confirm",
  ensureAuthenticated,
  confirmAdoptionController.handle
);

// Create Pet
petsRoutes.post(
  "/",
  ensureAuthenticated,
  Multer.array("images"),
  uploadArray,
  petsController.handle
);

// List All Pets
petsRoutes.get("/", ensureAuthenticated, listAllPetsController.handle);

// Request Pet Visit
petsRoutes.post(
  "/visit/:pet_id",
  ensureAuthenticated,
  requestPetVisitController.handle
);

// List Requesteded Pets Visits
petsRoutes.get(
  "/visit/requested",
  ensureAuthenticated,
  listRequestedVisitsController.handle
);

// List Received Pets Visits
petsRoutes.get(
  "/visit/received",
  ensureAuthenticated,
  listReceivedVisitsController.handle
);

// List My Pets
petsRoutes.get("/owner", ensureAuthenticated, listMyPetsController.handle);

// List Pets by Owner
petsRoutes.get(
  "/owner/:id",
  ensureAuthenticated,
  listPetsByOwnerController.handle
);

//Delete Pet
petsRoutes.delete("/:id", ensureAuthenticated, deletePetController.handle);

export { petsRoutes };
