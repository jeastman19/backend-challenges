import { Status } from '@src/domain/entities/product';

export interface CreatedProductDTO {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}
