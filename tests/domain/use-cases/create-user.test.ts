import { Role } from '@domain/entities/role';
import { User } from '@domain/entities/user';
import { UserRepository } from '@domain/repositories/user-repository';
import { PasswordHasher } from '@domain/services/password-hasher';
import { CreateUser } from '@domain/use-cases/create-user';

describe('CreateUser Use Case', () => {
    let mockUserRepository: UserRepository;
    let mockPasswordHasher: PasswordHasher;
    let createUser: CreateUser;

    const userData = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'plainPassword',
        role: 'admin' as Role,
    };

    beforeEach(() => {
        mockUserRepository = {
            save: jest.fn(),
        } as unknown as UserRepository;

        mockPasswordHasher = {
            hash: jest.fn().mockResolvedValue('hashedPassword'),
            compare: jest.fn(),
        };

        createUser = new CreateUser(mockUserRepository, mockPasswordHasher);
    });

    it('should create and save a user with valid attributes', async () => {
        await createUser.execute(userData);

        expect(mockPasswordHasher.hash).toHaveBeenCalledWith(userData.password);
        expect(mockUserRepository.save).toHaveBeenCalled();

        const savedUser: User = (mockUserRepository.save as jest.Mock).mock
            .calls[0][0];
        expect(savedUser.id).toBe(userData.id);
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser['password']).toBe('hashedPassword'); // Accessing private member for test purposes
        expect(savedUser.role).toBe(userData.role);
    });

    it('should throw an error if the email is invalid', async () => {
        const invalidUserData = { ...userData, email: 'invalid-email' };
        await expect(createUser.execute(invalidUserData)).rejects.toThrow(
            'Invalid email format',
        );
    });

    it('should throw an error if the name is empty', async () => {
        const invalidUserData = { ...userData, name: '' };
        await expect(createUser.execute(invalidUserData)).rejects.toThrow(
            'Name cannot be empty',
        );
    });
});
