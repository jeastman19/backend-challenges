import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import userRoutes from '@infra/routes/user-routes';

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.get('/ping', (req, res) => {
    return res.status(200).json({
        message: 'PONG',
    });
});

export { app };
