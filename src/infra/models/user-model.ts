import mongoose, { Document, Schema } from 'mongoose';

import { Role } from '@domain/entities/role';

interface IUser extends Document {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
}

const UserSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'user'] },
});

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
