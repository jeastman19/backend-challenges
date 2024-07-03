import { Role } from '@domain/entities/role';

export interface CreatedUserDTO {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}
