import { Product, Status } from '@domain/entities/product';
import { v4 as uuidv4 } from 'uuid';

describe('Product Entity', () => {
    it('should create a product with valid attributes', async () => {
        const id = uuidv4();
        const product = await Product.create(
            id,
            'Product 1',
            'Description 1',
            '2021-12-31',
            'not started',
        );

        expect(product).toBeInstanceOf(Product);
        expect(product.id).toBe(id);
        expect(product.title).toBe('Product 1');
        expect(product.description).toBe('Description 1');
        expect(product.dueDate).toBe('2021-12-31');
        expect(product.status).toBe('not started');
    });

    it('should throw an error when creating a product with invalid attributes', async () => {
        const id = uuidv4();
        expect(() =>
            Product.create(
                id,
                '',
                'Description 1',
                '2021-12-31',
                'not started',
            ),
        ).rejects.toThrow('Title is required');

        expect(() =>
            Product.create(id, 'Product 1', '', '2021-12-31', 'not started'),
        ).rejects.toThrow('Description is required');

        expect(() =>
            Product.create(id, 'Product 1', 'Description 1', '', 'not started'),
        ).rejects.toThrow('Due date is required');

        expect(() =>
            Product.create(
                id,
                'Product 1',
                'Description 1',
                '2021-12-31',
                '' as Status,
            ),
        ).rejects.toThrow('Status is required');
    });

    it('should get product attributes', async () => {
        const id = uuidv4();
        const product = await Product.create(
            id,
            'Product 1',
            'Description 1',
            '2021-12-31',
            'not started',
        );

        expect(product.id).toBe(id);
        expect(product.title).toBe('Product 1');
        expect(product.description).toBe('Description 1');
        expect(product.dueDate).toBe('2021-12-31');
        expect(product.status).toBe('not started');
    });

    it('should set product attributes', async () => {
        const id = uuidv4();
        const product = await Product.create(
            id,
            'Product 1',
            'Description 1',
            '2021-12-31',
            'not started',
        );

        product.title = 'Product 2';
        product.description = 'Description 2';
        product.dueDate = '2022-12-31';
        product.status = 'in progress';

        expect(product.title).toBe('Product 2');
        expect(product.description).toBe('Description 2');
        expect(product.dueDate).toBe('2022-12-31');
        expect(product.status).toBe('in progress');
    });
});
