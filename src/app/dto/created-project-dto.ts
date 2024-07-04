import { Status } from '@src/domain/entities/project';

export interface CreatedProjectDTO {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}
