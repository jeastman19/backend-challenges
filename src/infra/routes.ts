import express, { Request, Response } from 'express';

const routes = express.Router();

routes.post('/users', (req: Request, res: Response) => {
    console.log(req.body);
    res.status(201).json({ message: 'User created' });
});

export { routes };
