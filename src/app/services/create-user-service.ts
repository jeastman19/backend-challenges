import { CreateUserDTO } from '@app/dto/create-user-dto';
import { UserMapper } from '@app/maps/user-mapper';
import { CreateUser } from '@domain/use-cases/create-user';

import { CreatedUserDTO } from '../dto/created-user-dto';

export class CreateUserService {
    constructor(
        private createUserUC: CreateUser,
        private userMapper: UserMapper,
    ) {}

    async createUser(userData: CreateUserDTO): Promise<CreatedUserDTO> {
        const userDomain = await this.userMapper.toDomain(userData);
        await this.createUserUC.execute(userDomain);
        return this.userMapper.toCreatedDTO(userDomain);
    }
}
