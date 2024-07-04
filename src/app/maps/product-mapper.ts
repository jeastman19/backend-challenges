import { v4 as uuidv4 } from 'uuid';

import { Product } from '@src/domain/entities/product';

import { CreateProductDTO } from '../dto/create-product-dto';
import { CreatedProductDTO } from '../dto/created-product-dto';

export class ProductMapper {
    async toDomain(productData: CreateProductDTO): Promise<Product> {
        return Product.create(
            uuidv4(),
            productData.title,
            productData.description,
            productData.dueDate,
            productData.status,
        );
    }

    async toDTO(product: Product): Promise<CreateProductDTO> {
        return {
            title: product.title,
            description: product.description,
            dueDate: product.dueDate,
            status: product.status,
        };
    }

    async toCreatedDTO(product: Product): Promise<CreatedProductDTO> {
        return {
            id: product.id,
            title: product.title,
            description: product.description,
            dueDate: product.dueDate,
            status: product.status,
        };
    }
}
