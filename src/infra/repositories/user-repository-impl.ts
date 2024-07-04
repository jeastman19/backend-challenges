import { Role } from '@src/domain/entities/role';

import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user-repository';
import UserModel from '@infra/models/user-model';

export class UserRepositoryImpl implements UserRepository {
    async save(user: User): Promise<User> {
        const userDoc = new UserModel({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
        });
        const savedUser = await userDoc.save();
        return User.create(
            savedUser.id,
            savedUser.name,
            savedUser.email,
            savedUser.password,
            savedUser.role as Role,
        );
    }
}
