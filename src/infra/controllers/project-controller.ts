import { Request, Response } from 'express';

import { CreateProjectDTO } from '@app/dto/create-project-dto';
import { CreateProjectService } from '@app/services/create-project-service';

export class ProjectController {
    constructor(private createProjectService: CreateProjectService) {}

    async createProject(req: Request, res: Response): Promise<Response> {
        try {
            const createProjectDTO: CreateProjectDTO = req.body;
            const createdProject =
                await this.createProjectService.createProject(createProjectDTO);

            return res.status(201).json(createdProject);
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
}
