import { Role } from '@domain/entities/role';
import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user-repository';
import { PasswordHasher } from '@domain/services/password-hasher';

interface CreateUserRequest {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}

export class CreateUser {
    constructor(
        private userRepository: UserRepository,
        private passwordHasher: PasswordHasher,
    ) {}

    async execute(request: CreateUserRequest): Promise<void> {
        const user = await User.create(
            request.id,
            request.name,
            request.email,
            request.password,
            request.role,
            this.passwordHasher,
        );
        await this.userRepository.save(user);
    }
}
