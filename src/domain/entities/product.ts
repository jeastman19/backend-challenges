export type Status = 'not started' | 'in progress' | 'completed';

export class Product {
    private _id: string;
    private _title: string;
    private _description: string;
    private _dueDate: string;
    private _status: Status;

    private constructor(
        id: string,
        title: string,
        description: string,
        dueDate: string,
        status: Status,
    ) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._status = status;
    }

    public static async create(
        id: string,
        title: string,
        description: string,
        dueDate: string,
        status: Status,
    ): Promise<Product> {
        if (!title) {
            throw new Error('Title is required');
        }

        if (!description) {
            throw new Error('Description is required');
        }

        if (!dueDate) {
            throw new Error('Due date is required');
        }

        if (!status) {
            throw new Error('Status is required');
        }

        return new Product(id, title, description, dueDate, status);
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(title: string) {
        this._title = title;
    }

    get description(): string {
        return this._description;
    }

    set description(description: string) {
        this._description = description;
    }

    get dueDate(): string {
        return this._dueDate;
    }

    set dueDate(dueDate: string) {
        this._dueDate = dueDate;
    }

    get status(): Status {
        return this._status;
    }

    set status(status: Status) {
        this._status = status;
    }
}
