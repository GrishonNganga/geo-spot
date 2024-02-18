import { ObjectId } from "mongoose";
import { IPhotoSpace } from "../types";
import PhotoSpace from "@/models/PhotoSpace";

export const createPhotoSpace = async (data: IPhotoSpace) => {
    const photoSpace = new PhotoSpace(data);
    return await photoSpace.save();
}

export const findPhotoSpace = async (data: any) => {
    const photoSpace = PhotoSpace.findOne(data).populate('ownerId').populate("uploads")
    return await photoSpace;
}

export const findPhotoSpaces = async (data: any) => {
    const photoSpace = PhotoSpace.find(data).populate('ownerId').populate("uploads")
    return await photoSpace;
}

export const getPhotoSpace = async (_id: ObjectId) => {
    const photoSpace = PhotoSpace.findOne({ _id })
    return await photoSpace;
}

export const updatePhotoSpace = async (_id: ObjectId, data: any) => {
    let updateObject = {};
    for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
            updateObject.$addToSet = { [key]: data[key] };
        } else {
            updateObject.$set = { key: data[key] };
        }
    }
    const photoSpace = await PhotoSpace.findOneAndUpdate({
        _id
    }, updateObject,
        { upsert: false, new: true }).populate('ownerId').populate("uploads")
    return await photoSpace;
}