export interface CreateUserDTO {
  name: string;
  avatar: string;
  email: string;
  password: string;
  cpfCnpj: string;
  gender: string;
  birthday: Date;
  phone: string;
  address: {
    street: string;
    number: number;
    zipCode: string;
    city: string;
    federativeUnit: string;
  };
}
