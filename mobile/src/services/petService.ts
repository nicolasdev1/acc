import { PetProps } from "../@types/pet";
import { httpService } from "./httpService";

type CreatePetData = {
  age: PetProps["age"];
  breed: PetProps["breed"];
  description: PetProps["description"];
  gender: PetProps["gender"];
  image: any;
  name: PetProps["name"];
  status: PetProps["status"];
};

async function createPet({
  age,
  breed,
  description,
  gender,
  image,
  name,
  status,
}: CreatePetData): Promise<{ pet: CreatePetData }> {
  let token = await httpService.getJWT();

  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("age", age);
    form.append("breed", breed);
    form.append("description", description);
    form.append("gender", gender);
    form.append("name", name);
    form.append(
      "images",
      image != undefined
        ? {
            name: name + "_pet.jpg",
            uri: image.uri,
            type: "image/jpg",
          }
        : ""
    );
    form.append("status", status);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    httpService
      .post("/pets/", form, config)
      .then((response) => {
        resolve({
          pet: response.data,
        });
      })
      .catch((error) => {
        reject(new Error("Desculpe, não foi possível cadastrar o pet"));
        console.log("createPet error:");
        console.log(error);
      });
  });
}

export interface PetsResponse {
  pets: PetProps[];
}

function getPetsForAdoption(): Promise<PetsResponse> {
  return new Promise((resolve, reject) => {
    httpService
      .get("/pets/adoption/")
      .then((response) => {
        resolve({
          pets: response.data,
        });
      })
      .catch((error) => {
        reject(
          new Error("Desculpe, não foi possível obter os pets para adoção")
        );
        console.log("getPetsForAdoption error:");
        console.log(error);
      });
  });
}

async function getMyPets(): Promise<PetsResponse> {
  let token = await httpService.getJWT();

  return new Promise((resolve, reject) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    httpService
      .get("/pets/owner/", config)
      .then((response) => {
        resolve({
          pets: response.data.pets,
        });
      })
      .catch((error) => {
        reject(new Error("Desculpe, não foi possível obter os seus pets"));
        console.log("getMyPets error:");
        console.log(error);
      });
  });
}

async function getPetsByOwner(id?: string): Promise<PetsResponse> {
  let token = await httpService.getJWT();

  return new Promise((resolve, reject) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    httpService
      .get(`/pets/owner/${id}`, config)
      .then((response) => {
        resolve({
          pets: response.data.pets,
        });
      })
      .catch((error) => {
        reject(new Error("Desculpe, não foi possível obter os pets do usuário."));
        console.log("getPetsByOwner error:");
        console.log(error);
      });
  });
}

async function removePet(petId: string) {
  let token = await httpService.getJWT();

  return new Promise((resolve, reject) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    httpService
      .delete(`/pets/${petId}/`, config)
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error) => {
        reject(new Error("Desculpe, não foi possível remover o pet"));
        console.log("removePet error:");
        console.log(error);
      });
  });
}

async function requestPetVisit(petId: string) {
  let token = await httpService.getJWT();

  return new Promise((resolve, reject) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    httpService
      .post(`/pets/visit/${petId}`, {}, config)
      .then((response) => {
        resolve({ data: response.data });
      })
      .catch((error) => {
        reject(
          new Error("Desculpe, não foi possível criar o pedido de visita")
        );
        console.log("requestPetVisit error:");
        console.log(error);
      });
  });
}

async function getRequestedPetVisits() {
  let token = await httpService.getJWT();

  return new Promise((resolve, reject) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    httpService
      .get("/pets/visit/requested", config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(
          new Error(
            "Desculpe, não foi possível obter os pedidos enviados de visita"
          )
        );
        console.log("getRequestedPetVisits error:");
        console.log(error);
      });
  });
}

async function getReceivedPetVisits() {
  let token = await httpService.getJWT();

  return new Promise((resolve, reject) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    httpService
      .get("/pets/visit/received", config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(
          new Error(
            "Desculpe, não foi possível obter os pedidos recebidos de visita"
          )
        );
        console.log("getReceivedPetVisits error:");
        console.log(error);
      });
  });
}

async function confirmPetAdoption(petId: string, interestedUserId?: string) {
  let token = await httpService.getJWT();

  return new Promise((resolve, reject) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    httpService
      .post(
        "/pets/adoption/confirm",
        {
          pet_id: petId,
          interested_user_id: interestedUserId,
        },
        config
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error("Desculpe, não foi possível confirmar a adoção"));
        console.log("confirmPetAdoption error:");
        console.log(error);
      });
  });
}

async function rejectPetAdoption(petId: string, interestedUserId?: string) {
  let token = await httpService.getJWT();

  return new Promise((resolve, reject) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    httpService
      .post(
        "/pets/adoption/reject",
        {
          pet_id: petId,
          interested_user_id: interestedUserId,
        },
        config
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(new Error("Desculpe, não foi possível recusar a adoção"));
        console.log("rejectPetAdoption error:");
        console.log(error);
      });
  });
}

async function getAllPets(): Promise<PetsResponse> {
  let token = await httpService.getJWT();

  return new Promise((resolve, reject) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    httpService
      .get("/pets", config)
      .then((response) => {
        resolve({
          pets: response.data,
        });
      })
      .catch((error) => {
        reject(new Error("Desculpe, não foi possível obter os pets"));
        console.log("getAllPets error:");
        console.log(error);
      });
  });
}

export const petService = {
  createPet,
  getPetsForAdoption,
  getMyPets,
  removePet,
  requestPetVisit,
  getRequestedPetVisits,
  getReceivedPetVisits,
  confirmPetAdoption,
  rejectPetAdoption,
  getAllPets,
  getPetsByOwner
};
