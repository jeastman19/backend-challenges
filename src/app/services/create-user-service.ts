import { CreateUser } from '../../domain/use-cases/create-user';
import { CreateUserDTO } from '../dto/create-user-dto';
import { UserMapper } from '../maps/user-mapper';

export class CreateUserService {
    constructor(
        private createUserUC: CreateUser,
        private userMapper: UserMapper,
    ) {}

    async createUser(userData: CreateUserDTO): Promise<CreateUserDTO> {
        const userDomain = await this.userMapper.toDomain(userData);
        await this.createUserUC.execute(userDomain);
        return this.userMapper.toDTO(userDomain);
    }
}
