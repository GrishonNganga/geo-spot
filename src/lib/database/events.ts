import { ObjectId } from "mongoose";
import { IEvent } from "../types";
import Event from "@/models/Event"

interface UpdateObject {
    $addToSet?: { [key: string]: any };
    $set?: { [key: string]: any };
}

export const createEvent = async (data: IEvent) => {
    const event = new Event(data);
    return await event.save();
}

export const findEvent = async (data: any) => {
    const event = Event.findOne(data).populate('owner').populate('attendees').populate("group")
    return await event;
}

type FilterType = { key: String, value: Object }
export async function findEvents(field: string, value: string | ObjectId | number, filter?: FilterType | FilterType[], useAggregate: boolean = false) {
    try {
        const key = (filter as FilterType)?.key as string
        const val = (filter as FilterType)?.value
        if (useAggregate) {
            const events = await Event.aggregate([
                {
                    $match: {
                        [field]: value
                    },
                    [key]: val
                }
            ]);
            return events;
        } else {
            const events = await Event.find({ [field]: value, [key]: val }).populate('owner').populate('attendees').populate("group");
            return events;
        }
    } catch (error) {
        console.error("Error finding events:", error);
        throw error;
    }
}

export const getEvent = async (_id: ObjectId) => {
    const event = Event.findOne({ _id })
    return await event;
}

export const updateEvent = async (eventId: ObjectId, data: any, options: { session?: any } = {}) => {
    const { session } = options
    try {
        let updateObject: UpdateObject = { $addToSet: {} };
        for (const key of Object.keys(data)) {
            if (Array.isArray(data[key])) {
                updateObject.$addToSet = { [key]: data[key] };
            } else {
                updateObject.$set = { key: data[key] };
            }
        }
        const event = await Event.findOneAndUpdate({
            _id: eventId
        }, updateObject,
            { upsert: false, session })
        return await event;
    } catch (e) {
        console.error("Error finding users:", e);
        throw e;
    }

}