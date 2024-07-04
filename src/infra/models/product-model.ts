import { Status } from '@src/domain/entities/product';
import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: Status;
}

const ProductSchema: Schema = new Schema({
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

const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);
export default ProductModel;
