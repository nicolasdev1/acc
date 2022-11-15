export interface UserProps {
    _id?: string;
    name: string;
    email: string;
    password: string;
    cpfCnpj: string;
    gender: string;
    birthday: string;
    phone: string;
    address: {
        street: string;
        number: number;
        zipCode: string;
        city: string;
        federativeUnit: string;
    };
    avatar: any | undefined;
    userType?: string
}