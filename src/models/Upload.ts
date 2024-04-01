import { IUpload } from '@/lib/types';
import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
    url: String,
    metadata: Object
});


const uploadSchema = new mongoose.Schema({
    location: { type: Object, required: true },
    trees: { type: Number, required: true, default: 1 },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    photoSpaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotoSpace'
    },
    photos: [PhotoSchema]
}, { timestamps: true });

export default mongoose.models.Upload || mongoose.model<IUpload>('Upload', uploadSchema);
