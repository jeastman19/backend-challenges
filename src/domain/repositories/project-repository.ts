import { Status } from '@domain/entities/project';

interface NewProjectDTO {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}

export interface ProjectRepository {
    save(data: NewProjectDTO): void;
}
