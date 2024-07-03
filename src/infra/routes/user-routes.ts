import { Request, Response, Router } from 'express';

import { userController } from '@infra/dependencies';

const router = Router();

router.post('/', (req: Request, res: Response) =>
    userController.createUser(req, res),
);

export default router;
