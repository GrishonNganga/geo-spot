import { IEvent, IUser } from '@/lib/types';
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date },
    location: {
        latitude: { type: Number },
        longitude: { type: Number },
        location: { type: String }
    },
    start: { type: String },
    end: { type: String },
    price: { type: Number },
    target: { type: Number },
    capacity: { type: Number },
    photo: { type: String },
    image: { type: String },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PhotoSpace'
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

}, { timestamps: true });

export default mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);