import { Router } from 'express';

import { UserController } from '@infra/controllers/user-controller';
import { createUserService } from '@infra/dependencies';

const router = Router();
const userController = new UserController(createUserService);

router.post('/users', (req, res) => userController.createUser(req, res));

export default router;
