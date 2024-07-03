import { Role } from '../../domain/entities/role';

export interface CreateUserDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}
