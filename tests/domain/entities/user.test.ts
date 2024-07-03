// tests/domain/entities/user.test.ts

import { User } from '@domain/entities/user';
import { PasswordHasher } from '@domain/services/password-hasher';
import { Role } from '@domain/entities/role';

describe('User Entity', () => {
    let mockPasswordHasher: PasswordHasher;
    const password = 'plainPassword';
    const hashedPassword = 'hashedPassword';
    const role: Role = 'admin';

    beforeEach(() => {
        mockPasswordHasher = {
            hash: jest.fn().mockResolvedValue(hashedPassword),
            compare: jest.fn().mockResolvedValue(true),
        };
    });

    it('should create a user with valid attributes', async () => {
        const user = await User.create(
            '1',
            'John Doe',
            'john.doe@example.com',
            password,
            role,
            mockPasswordHasher,
        );
        expect(user.id).toBe('1');
        expect(user.name).toBe('John Doe');
        expect(user.email).toBe('john.doe@example.com');
        expect(user['password']).toBe(hashedPassword); // Accessing private member for test purposes
        expect(user.role).toBe(role);
        expect(mockPasswordHasher.hash).toHaveBeenCalledWith(password);
    });

    it('should validate the email format', async () => {
        await expect(
            User.create(
                '2',
                'Jane Doe',
                'invalid-email',
                password,
                role,
                mockPasswordHasher,
            ),
        ).rejects.toThrowError('Invalid email format');
    });

    it('should validate the name is not empty', async () => {
        await expect(
            User.create(
                '3',
                '',
                'jane.doe@example.com',
                password,
                role,
                mockPasswordHasher,
            ),
        ).rejects.toThrowError('Name cannot be empty');
    });

    it('should validate password successfully', async () => {
        const user = await User.create(
            '4',
            'John Doe',
            'john.doe@example.com',
            password,
            role,
            mockPasswordHasher,
        );
        const isValid = await user.validatePassword(
            password,
            mockPasswordHasher,
        );
        expect(isValid).toBe(true);
        expect(mockPasswordHasher.compare).toHaveBeenCalledWith(
            password,
            hashedPassword,
        );
    });

    it('should update user name', async () => {
        const user = await User.create(
            '5',
            'John Doe',
            'john.doe@example.com',
            password,
            role,
            mockPasswordHasher,
        );
        user.updateName('John Smith');
        expect(user.name).toBe('John Smith');
    });

    it('should update user email', async () => {
        const user = await User.create(
            '6',
            'John Doe',
            'john.doe@example.com',
            password,
            role,
            mockPasswordHasher,
        );
        user.updateEmail('john.smith@example.com');
        expect(user.email).toBe('john.smith@example.com');
    });
});
