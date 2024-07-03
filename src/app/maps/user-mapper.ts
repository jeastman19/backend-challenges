import { CreateUserDTO } from '@app/dto/create-user-dto';
import { User } from '@domain/entities/user';
import { PasswordHasher } from '@domain/services/password-hasher';
import { CreatedUserDTO } from '../dto/created-user-dto';
import { v4 as uuidv4 } from 'uuid';

export class UserMapper {
    constructor(private passwordHasher: PasswordHasher) {}

    async toDomain(dto: CreateUserDTO): Promise<User> {
        return User.create(
            uuidv4(),
            dto.name,
            dto.email,
            await this.passwordHasher.hash(dto.password),
            dto.role,
        );
    }

    toDTO(user: User): CreateUserDTO {
        return {
            name: user.name,
            email: user.email,
            password: '', // avoid returning hashed password
            role: user.role,
        };
    }

    toCreatedDTO(user: User): CreatedUserDTO {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: '', // avoid returning hashed password
            role: user.role,
        };
    }
}
