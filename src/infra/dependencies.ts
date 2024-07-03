import bcrypt from 'bcrypt';

import { UserMapper } from '../app/maps/user-mapper';
import { CreateUserService } from '../app/services/create-user-service';
import { PasswordHasher } from '../domain/services/password-hasher';
import { CreateUser } from '../domain/use-cases/create-user';
import { UserRepositoryImpl } from './repositories/user-repository-impl';

class BcryptPasswordHasher implements PasswordHasher {
    private readonly saltRounds = 10;

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(password, hashed);
    }
}

const userRepository = new UserRepositoryImpl();
const passwordHasher = new BcryptPasswordHasher();
const userMapper = new UserMapper(passwordHasher);
const createUser = new CreateUser(userRepository, passwordHasher);
const createUserService = new CreateUserService(createUser, userMapper);

export { createUserService };
