import { v4 as uuidv4 } from 'uuid';

import { Project } from '@src/domain/entities/project';

import { CreateProjectDTO } from '../dto/create-project-dto';
import { CreatedProjectDTO } from '../dto/created-project-dto';

export class ProjectMapper {
    async toDomain(projectData: CreateProjectDTO): Promise<Project> {
        return Project.create(
            uuidv4(),
            projectData.title,
            projectData.description,
            projectData.dueDate,
            projectData.status,
        );
    }

    async toDTO(project: Project): Promise<CreateProjectDTO> {
        return {
            title: project.title,
            description: project.description,
            dueDate: project.dueDate,
            status: project.status,
        };
    }

    async toCreatedDTO(project: Project): Promise<CreatedProjectDTO> {
        return {
            id: project.id,
            title: project.title,
            description: project.description,
            dueDate: project.dueDate,
            status: project.status,
        };
    }
}
