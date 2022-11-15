export interface CreatePetDTO {
  name: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  images: [string];
  owner: string;
}
