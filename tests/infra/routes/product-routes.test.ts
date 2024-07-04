import request from 'supertest';

import { app } from '@src/app';

describe('POST /products', () => {
    it('should return 201', async () => {
        const newProduct = {
            title: 'Product 1',
            description: 'Description 1',
            dueDate: '2022-12-12',
            status: 'not started',
        };

        const response = await request(app)
            .post('/products')
            .send(newProduct)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
    });
});
