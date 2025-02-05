import { Role } from '@domain/entities/role';

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
    role: Role;
}
