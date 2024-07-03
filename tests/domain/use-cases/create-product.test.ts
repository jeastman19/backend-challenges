import { Product, Status } from '@domain/entities/product';
import { ProductRepository } from '@domain/repositories/product-repository';
import {
    CreateProduct,
    CreateProductRequest,
} from '@domain/use-cases/create-product';
import { v4 as uuidv4 } from 'uuid';

describe('CreateProduct Use Case', () => {
    let mockProductRepository: ProductRepository;
    let createProduct: CreateProduct;

    const productData: CreateProductRequest = {
        id: uuidv4(),
        title: 'Product 1',
        description: 'Description 1',
        dueDate: '2021-12-31',
        status: 'not started' as Status,
    };

    beforeEach(() => {
        mockProductRepository = {
            save: jest.fn(),
        } as unknown as ProductRepository;

        createProduct = new CreateProduct(mockProductRepository);
    });

    it('should create and save a product with valid attributes', async () => {
        await createProduct.execute(productData);

        expect(mockProductRepository.save).toHaveBeenCalled();

        const savedProduct: Product = (mockProductRepository.save as jest.Mock)
            .mock.calls[0][0];
        expect(savedProduct.id).toBe(productData.id);
        expect(savedProduct.title).toBe(productData.title);
        expect(savedProduct.description).toBe(productData.description);
        expect(savedProduct.dueDate).toBe(productData.dueDate);
        expect(savedProduct.status).toBe(productData.status);
    });
});
