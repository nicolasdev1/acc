import { UserProps } from "./user";

export interface PetProps {
    _id: string;
    age: number;
    breed: string;
    createdAt: string;
    description: string;
    gender: string;
    images: string[];
    name: string;
    owner: UserProps
    status: string; //Adoption/Donation
    updatedAt: string;
    interested_users: UserProps[]
}