import mongoose from 'mongoose';
import Upload from './Upload';

const photoSpaceSchema = new mongoose.Schema({
    spaceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    invitations: [{ type: String }],
    access: { type: Boolean, required: true, default: false },
    photos: [Upload],
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
}, { timestamps: true });

export default mongoose.models.PhotoSpace || mongoose.model('PhotoSpace', photoSpaceSchema);