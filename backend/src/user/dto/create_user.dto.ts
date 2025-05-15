// CREATE NEW USER DTO
export class CreateUserDto {
  username: string;
  fname: string;
  lname: string;
  email: string;
  password: string;
  mobile?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  dateOfBirth?: string;
}
