import { ProductRepository } from '@domain/repositories/product-repository';
import { Product, Status } from '@domain/entities/product';

export interface CreateProductRequest {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}

export class CreateProduct {
    constructor(private productRepository: ProductRepository) {}

    async execute(request: CreateProductRequest): Promise<void> {
        const product = await Product.create(
            request.id,
            request.title,
            request.description,
            request.dueDate,
            request.status,
        );
        await this.productRepository.save(product);
    }
}
