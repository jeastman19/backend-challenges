import { User } from '../../domain/entities/user';
import { PasswordHasher } from '../../domain/services/password-hasher';
import { CreateUserDTO } from '../dto/create-user-dto';

export class UserMapper {
    constructor(private passwordHasher: PasswordHasher) {}

    async toDomain(dto: CreateUserDTO): Promise<User> {
        return User.create(
            dto.id,
            dto.name,
            dto.email,
            dto.password,
            dto.role,
            this.passwordHasher,
        );
    }

    toDTO(user: User): CreateUserDTO {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: '', // Never return the hashed password in the DTO
            role: user.role,
        };
    }
}
