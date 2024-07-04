import bcrypt from 'bcrypt';

import { UserMapper } from '@app/maps/user-mapper';
import { CreateUserService } from '@app/services/create-user-service';
import { PasswordHasher } from '@domain/services/password-hasher';
import { CreateUser } from '@domain/use-cases/create-user';
import { UserController } from '@infra/controllers/user-controller';
import { ProjectRepositoryImpl } from '@infra/repositories/project-repository-impl';
import { UserRepositoryImpl } from '@infra/repositories/user-repository-impl';
import { ProjectMapper } from '@src/app/maps/project-mapper';
import { CreateProjectService } from '@src/app/services/create-project-service';
import { CreateProject } from '@src/domain/use-cases/create-project';

import { ProjectController } from './controllers/project-controller';

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

const projectRepository = new ProjectRepositoryImpl();

const createProject = new CreateProject(projectRepository);
const projectMapper = new ProjectMapper();

const createProjectService = new CreateProjectService(
    createProject,
    projectMapper,
);

const userController = new UserController(createUserService);
const projectController = new ProjectController(createProjectService);

export { projectController, userController };
