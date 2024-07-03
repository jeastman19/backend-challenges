import { CreateUserDTO } from '@app/dto/create-user-dto';
import { User } from '@domain/entities/user';
import { PasswordHasher } from '@domain/services/password-hasher';

export class UserMapper {
    constructor(private passwordHasher: PasswordHasher) {}

    async toDomain(dto: CreateUserDTO): Promise<User> {
        return User.create(
            dto.id,
            dto.name,
            dto.email,
            await this.passwordHasher.hash(dto.password),
            dto.role,
        );
    }

    toDTO(user: User): CreateUserDTO {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: '', // avoid returning hashed password
            role: user.role,
        };
    }
}
