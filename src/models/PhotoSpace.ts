import { IPhotoSpace } from '@/lib/types';
import mongoose from 'mongoose';

const photoSpaceSchema = new mongoose.Schema({
    spaceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    invitations: [{ type: String }],
    access: { type: Boolean, required: true, default: false },
    uploads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Upload' }],
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

export default mongoose.models.PhotoSpace || mongoose.model<IPhotoSpace>('PhotoSpace', photoSpaceSchema);