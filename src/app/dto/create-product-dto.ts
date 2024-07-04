import { Status } from '@src/domain/entities/product';

export interface CreateProductDTO {
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}
