import { IUpload } from '@/lib/types';
import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
    url: String,
    metadata: Object
});

const TreeSchema = new mongoose.Schema({
    name: String,
    scientificName: String,
    desciption: String
});


const uploadSchema = new mongoose.Schema({
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
        location: { type: String }
    },
    trees: { type: Number, required: true, default: 1 },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    photoSpaceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotoSpace'
    },
    photos: [PhotoSchema],
    treeTypes: [TreeSchema]
}, { timestamps: true });

export default mongoose.models.Upload || mongoose.model<IUpload>('Upload', uploadSchema);
