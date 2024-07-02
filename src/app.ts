import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(bodyParser.json());

app.get('/ping', (req, res) => {
    return res.status(200).json({
        message: 'PONG',
    });
});

export { app };
