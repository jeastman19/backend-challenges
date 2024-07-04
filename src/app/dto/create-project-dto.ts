import { Status } from '@src/domain/entities/project';

export interface CreateProjectDTO {
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}
