import { Status } from '@domain/entities/product';

interface NewProductDTO {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}

export interface ProductRepository {
    save(data: NewProductDTO): void;
}
