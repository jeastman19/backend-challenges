interface NewUserDTO {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface UserRepository {
    save(data: NewUserDTO): void;
}
