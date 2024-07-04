import { v4 as uuidv4 } from 'uuid';

import { Project, Status } from '@domain/entities/project';
import { ProjectRepository } from '@domain/repositories/project-repository';
import {
    CreateProject,
    CreateProjectRequest,
} from '@src/domain/use-cases/create-project';

describe('CreateProject Use Case', () => {
    let mockProjectRepository: ProjectRepository;
    let createProject: CreateProject;

    const projectData: CreateProjectRequest = {
        id: uuidv4(),
        title: 'Project 1',
        description: 'Description 1',
        dueDate: '2021-12-31',
        status: 'not started' as Status,
    };

    beforeEach(() => {
        mockProjectRepository = {
            save: jest.fn(),
        } as unknown as ProjectRepository;

        createProject = new CreateProject(mockProjectRepository);
    });

    it('should create and save a project with valid attributes', async () => {
        await createProject.execute(projectData);

        expect(mockProjectRepository.save).toHaveBeenCalled();

        const savedProject: Project = (mockProjectRepository.save as jest.Mock)
            .mock.calls[0][0];
        expect(savedProject.id).toBe(projectData.id);
        expect(savedProject.title).toBe(projectData.title);
        expect(savedProject.description).toBe(projectData.description);
        expect(savedProject.dueDate).toBe(projectData.dueDate);
        expect(savedProject.status).toBe(projectData.status);
    });
});
