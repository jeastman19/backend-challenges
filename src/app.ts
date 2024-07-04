import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import userRoutes from '@infra/routes/user-routes';
import productRoutes from '@infra/routes/product-routes';

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.get('/ping', (req, res) => {
    return res.status(200).json({
        message: 'PONG',
    });
});

export { app };
