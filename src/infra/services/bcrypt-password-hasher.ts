import * as bcrypt from 'bcrypt';

import { PasswordHasher } from '@domain/services/password-hasher';

export class BcryptPasswordHasher implements PasswordHasher {
    private readonly saltRounds = 10;

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async compare(password: string, hashed: string): Promise<boolean> {
        return await bcrypt.compare(password, hashed);
    }
}
