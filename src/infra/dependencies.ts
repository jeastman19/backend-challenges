import bcrypt from 'bcrypt';

import { UserMapper } from '@app/maps/user-mapper';
import { CreateUserService } from '@app/services/create-user-service';
import { PasswordHasher } from '@domain/services/password-hasher';
import { CreateUser } from '@domain/use-cases/create-user';
import { UserController } from '@infra/controllers/user-controller';
import { ProductRepositoryImpl } from '@infra/repositories/product-repository-impl';
import { UserRepositoryImpl } from '@infra/repositories/user-repository-impl';
import { ProductMapper } from '@src/app/maps/product-mapper';
import { CreateProductService } from '@src/app/services/create-product-service';
import { CreateProduct } from '@src/domain/use-cases/create-product';
import { ProductController } from './controllers/product-controller';

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

const productRepository = new ProductRepositoryImpl();

const createProduct = new CreateProduct(productRepository);
const productMapper = new ProductMapper();

const createProductService = new CreateProductService(
    createProduct,
    productMapper,
);

const userController = new UserController(createUserService);
const productController = new ProductController(createProductService);

export { productController, userController };
