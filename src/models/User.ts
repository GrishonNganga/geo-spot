import { IUser } from '@/lib/types';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotoSpace'
    }],

}, { timestamps: true });

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);