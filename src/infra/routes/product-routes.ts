import { Request, Response, Router } from 'express';

import { productController } from '@infra/dependencies';

const router = Router();

router.post('/', (req: Request, res: Response) =>
    productController.createProduct(req, res),
);

export default router;
