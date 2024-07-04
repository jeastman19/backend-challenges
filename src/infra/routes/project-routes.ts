import { Request, Response, Router } from 'express';

import { projectController } from '@infra/dependencies';

const router = Router();

router.post('/', (req: Request, res: Response) =>
    projectController.createProject(req, res),
);

export default router;
