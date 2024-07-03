import { Request, Response } from 'express';

import { CreateUserDTO } from '@app/dto/create-user-dto';
import { CreateUserService } from '@app/services/create-user-service';

export class UserController {
    constructor(private createUserService: CreateUserService) {}

    async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const createUserDTO: CreateUserDTO = req.body;
            const createdUser =
                await this.createUserService.createUser(createUserDTO);

            return res.status(201).json(createdUser);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}
