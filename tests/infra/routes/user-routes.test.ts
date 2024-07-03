import request from 'supertest';

import { app } from '@src/app';

describe('POST /users', () => {
    it('should return 201', async () => {
        const newUser = {
            name: 'jeastman',
            email: 'jeastman19@gmail.com',
            password: 'password',
            role: 'admin',
        };

        const response = await request(app)
            .post('/users')
            .send(newUser)
            .set('Accept', 'application/json');

        console.log(response.body);

        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
    });
});
