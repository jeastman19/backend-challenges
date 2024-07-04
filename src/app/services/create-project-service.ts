import { CreateProjectDTO } from '@app/dto/create-project-dto';
import { ProjectMapper } from '@src/app/maps/project-mapper';
import { CreateProject } from '@src/domain/use-cases/create-project';

import { CreatedProjectDTO } from '../dto/created-project-dto';

export class CreateProjectService {
    constructor(
        private createProjectUC: CreateProject,
        private projectMapper: ProjectMapper,
    ) {}

    async createProject(
        projectData: CreateProjectDTO,
    ): Promise<CreatedProjectDTO> {
        const projectDomain = await this.projectMapper.toDomain(projectData);
        await this.createProjectUC.execute(projectDomain);
        return this.projectMapper.toCreatedDTO(projectDomain);
    }
}
