import { CreateUserDTO } from '@app/dto/create-user-dto';
import { UserMapper } from '@app/maps/user-mapper';
import { CreateUserService } from '@app/services/create-user-service';
import { Role } from '@domain/entities/role';
import { User } from '@domain/entities/user';
import { PasswordHasher } from '@domain/services/password-hasher';
import { CreateUser } from '@domain/use-cases/create-user';

describe('CreateUserService', () => {
    let createUserService: CreateUserService;
    let mockCreateUser: CreateUser;
    let mockPasswordHasher: PasswordHasher;
    let userMapper: UserMapper;
    let domainUser: User;

    const userData: CreateUserDTO = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'plainPassword',
        role: 'admin' as Role,
    };

    beforeEach(async () => {
        const hashedPassword = 'hashedPassword';

        mockCreateUser = {
            execute: jest.fn(),
        } as unknown as CreateUser;

        mockPasswordHasher = {
            hash: jest.fn().mockResolvedValue(hashedPassword),
            compare: jest.fn().mockResolvedValue(true),
        };

        userMapper = new UserMapper(mockPasswordHasher);

        createUserService = new CreateUserService(mockCreateUser, userMapper);

        domainUser = await User.create(
            userData.id,
            userData.name,
            userData.email,
            hashedPassword,
            userData.role,
            mockPasswordHasher,
        );

        jest.spyOn(userMapper, 'toDomain').mockResolvedValue(domainUser);
        jest.spyOn(userMapper, 'toDTO').mockReturnValue(userData);
    });

    it('should create a user and return the created user DTO', async () => {
        await createUserService.createUser(userData);

        expect(userMapper.toDomain).toHaveBeenCalledWith(userData);
        expect(mockCreateUser.execute).toHaveBeenCalledWith(domainUser);
        expect(userMapper.toDTO).toHaveBeenCalledWith(domainUser);

        const result = await createUserService.createUser(userData);
        expect(result).toEqual(userData);
    });

    it('should throw an error if user creation fails', async () => {
        jest.spyOn(mockCreateUser, 'execute').mockRejectedValue(
            new Error('User creation failed'),
        );

        await expect(createUserService.createUser(userData)).rejects.toThrow(
            'User creation failed',
        );
    });
});
