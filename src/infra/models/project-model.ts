import { Status } from '@src/domain/entities/project';
import mongoose, { Document, Schema } from 'mongoose';

interface IProject extends Document {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}

const ProjectSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['not started', 'in progress', 'completed'],
    },
});

const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);
export default ProjectModel;
