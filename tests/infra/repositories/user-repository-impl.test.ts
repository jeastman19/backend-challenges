import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { Role } from '@domain/entities/role';
import { User } from '@domain/entities/user';
import UserModel from '@infra/models/user-model';
import { UserRepositoryImpl } from '@infra/repositories/user-repository-impl';

describe('UserRepositoryImpl', () => {
    let mongoServer: MongoMemoryServer;
    let userRepositoryImpl: UserRepositoryImpl;

    const user = {
        id: new mongoose.Types.ObjectId().toHexString(),
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'hashedPassword',
        role: 'admin' as Role,
    };

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();

        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    beforeEach(() => {
        userRepositoryImpl = new UserRepositoryImpl();
    });

    afterEach(async () => {
        await UserModel.deleteMany({});
    });

    it('should save a user', async () => {
        const userEntity = await User.create(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
        );
        const savedUser = await userRepositoryImpl.save(userEntity);

        expect(savedUser.id).toBe(user.id);
        expect(savedUser.name).toBe(user.name);
        expect(savedUser.email).toBe(user.email);
        expect(savedUser.password).toBe(user.password);
        expect(savedUser.role).toBe(user.role);
    });
});
