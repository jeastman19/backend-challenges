import request from 'supertest';

import { app } from '@src/app';

describe('POST /users', () => {
    it('should return 200', async () => {
        const newUser = {
            username: 'jeastman',
            email: 'jeastman19@gmail.com',
            password: 'password',
        };

        const response = await request(app)
            .post('/users')
            .send(newUser)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
    });
});
