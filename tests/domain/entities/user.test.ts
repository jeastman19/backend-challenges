import { User } from '@domain/entities/user';
import { Role } from '@domain/entities/role';

describe('User Entity', () => {
    const password = 'plainPassword';
    const role: Role = 'admin';

    it('should create a user with valid attributes', async () => {
        const user = await User.create(
            '1',
            'John Doe',
            'john.doe@example.com',
            password,
            role,
        );
        expect(user.id).toBe('1');
        expect(user.name).toBe('John Doe');
        expect(user.email).toBe('john.doe@example.com');
        expect(user.role).toBe(role);
    });

    it('should validate the email format', async () => {
        await expect(
            User.create('2', 'Jane Doe', 'invalid-email', password, role),
        ).rejects.toThrow('Invalid email format');
    });

    it('should validate the name is not empty', async () => {
        await expect(
            User.create('3', '', 'jane.doe@example.com', password, role),
        ).rejects.toThrow('Name cannot be empty');
    });

    it('should update user name', async () => {
        const user = await User.create(
            '5',
            'John Doe',
            'john.doe@example.com',
            password,
            role,
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
        );
        user.updateEmail('john.smith@example.com');
        expect(user.email).toBe('john.smith@example.com');
    });
});
