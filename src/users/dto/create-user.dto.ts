import { UserRole } from '../entities/type';

export class CreateUserDto {
  name: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  password: string;
}
