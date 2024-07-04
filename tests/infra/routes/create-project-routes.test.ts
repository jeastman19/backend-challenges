import request from 'supertest';

import { app } from '@src/app';

describe('POST /projects', () => {
    it('should return 201', async () => {
        const newProject = {
            title: 'Project 1',
            description: 'Description 1',
            dueDate: '2022-12-12',
            status: 'not started',
        };

        const response = await request(app)
            .post('/projects')
            .send(newProject)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.headers['content-type']).toMatch(/json/);
    });
});
