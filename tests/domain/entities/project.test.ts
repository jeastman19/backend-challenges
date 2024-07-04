import { Project, Status } from '@domain/entities/project';
import { v4 as uuidv4 } from 'uuid';

describe('Project Entity', () => {
    it('should create a project with valid attributes', async () => {
        const id = uuidv4();
        const project = await Project.create(
            id,
            'Project 1',
            'Description 1',
            '2021-12-31',
            'not started',
        );

        expect(project).toBeInstanceOf(Project);
        expect(project.id).toBe(id);
        expect(project.title).toBe('Project 1');
        expect(project.description).toBe('Description 1');
        expect(project.dueDate).toBe('2021-12-31');
        expect(project.status).toBe('not started');
    });

    it('should throw an error when creating a project with invalid attributes', async () => {
        const id = uuidv4();
        expect(() =>
            Project.create(
                id,
                '',
                'Description 1',
                '2021-12-31',
                'not started',
            ),
        ).rejects.toThrow('Title is required');

        expect(() =>
            Project.create(id, 'Project 1', '', '2021-12-31', 'not started'),
        ).rejects.toThrow('Description is required');

        expect(() =>
            Project.create(id, 'Project 1', 'Description 1', '', 'not started'),
        ).rejects.toThrow('Due date is required');

        expect(() =>
            Project.create(
                id,
                'Project 1',
                'Description 1',
                '2021-12-31',
                '' as Status,
            ),
        ).rejects.toThrow('Status is required');
    });

    it('should get project attributes', async () => {
        const id = uuidv4();
        const project = await Project.create(
            id,
            'Project 1',
            'Description 1',
            '2021-12-31',
            'not started',
        );

        expect(project.id).toBe(id);
        expect(project.title).toBe('Project 1');
        expect(project.description).toBe('Description 1');
        expect(project.dueDate).toBe('2021-12-31');
        expect(project.status).toBe('not started');
    });

    it('should set project attributes', async () => {
        const id = uuidv4();
        const project = await Project.create(
            id,
            'Project 1',
            'Description 1',
            '2021-12-31',
            'not started',
        );

        project.title = 'Project 2';
        project.description = 'Description 2';
        project.dueDate = '2022-12-31';
        project.status = 'in progress';

        expect(project.title).toBe('Project 2');
        expect(project.description).toBe('Description 2');
        expect(project.dueDate).toBe('2022-12-31');
        expect(project.status).toBe('in progress');
    });
});
