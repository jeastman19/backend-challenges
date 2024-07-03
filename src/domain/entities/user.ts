import { PasswordHasher } from '../services/password-hasher';
import { Role } from './role';

export class User {
    private readonly _id: string;
    private _name: string;
    private _email: string;
    private _password: string;
    private _role: Role;

    private constructor(
        id: string,
        name: string,
        email: string,
        hashedPassword: string,
        role: Role,
    ) {
        this.validateEmail(email);
        this.validateName(name);

        this._id = id;
        this._name = name;
        this._email = email;
        this._password = hashedPassword;
        this._role = role;
    }

    static async create(
        id: string,
        name: string,
        email: string,
        password: string,
        role: Role,
        passwordHasher: PasswordHasher,
    ): Promise<User> {
        const hashedPassword = await passwordHasher.hash(password);

        return new User(id, name, email, hashedPassword, role);
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get role(): Role {
        return this._role;
    }

    private validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
    }

    private validateName(name: string): void {
        if (!name || name.trim().length === 0) {
            throw new Error('Name cannot be empty');
        }
    }

    public async validatePassword(
        password: string,
        passwordHasher: PasswordHasher,
    ): Promise<boolean> {
        return await passwordHasher.compare(password, this.password);
    }

    public updateName(name: string): void {
        this.validateName(name);
        this._name = name;
    }

    public updateEmail(email: string): void {
        this.validateEmail(email);
        this._email = email;
    }
}
