export interface UpdateUserDTO {
  name?: string;
  email?: string;
  phone?: string;
  address?: {
    street?: string;
    number?: number;
    zipCode?: string;
    city?: string;
    federativeUnit?: string;
  };
  avatar?: string;
}
