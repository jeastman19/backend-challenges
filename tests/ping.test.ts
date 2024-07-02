import request from 'supertest';

import { app } from '@app';

describe('GET /ping', () => {
    it('should return 200', (done) => {
        request(app)
            .get('/ping')
            .expect('Content-Type', /json/)
            .expect('{"message":"PONG"}')
            .expect(200, done);
    });
});
