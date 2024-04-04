import { ObjectId } from "mongoose";
import { IPhotoSpace } from "../types";
import PhotoSpace from "@/models/PhotoSpace";

export const createPhotoSpace = async (data: IPhotoSpace) => {
    const photoSpace = new PhotoSpace(data);
    return await photoSpace.save();
}

export const findPhotoSpace = async (data: any) => {
    const photoSpace = PhotoSpace.findOne(data).populate('ownerId').populate({ path: "uploads", populate: { path: "userId" } })
    return await photoSpace;
}

export const findPhotoSpaces = async (data: any) => {
    const photoSpace = PhotoSpace.find(data).populate('ownerId').populate("uploads").sort({ createdAt: -1 })
    return await photoSpace;
}

export const getPhotoSpace = async (data: any) => {
    const photoSpace = PhotoSpace.findOne(data)
    return await photoSpace;
}

interface UpdateObject {
    $addToSet?: { [key: string]: any };
    $set?: { [key: string]: any };
}

export const updatePhotoSpace = async (_id?: ObjectId, data?: any, options: { session?: any } = {}) => {
    const { session } = options
    let updateObject: UpdateObject = { $addToSet: {} };
    for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
            updateObject.$addToSet = { [key]: data[key] };
        } else {
            updateObject.$set = { [key]: data[key] };
        }
    }
    const photoSpace = await PhotoSpace.findOneAndUpdate({
        _id
    }, updateObject,
        { upsert: false, new: true, session }).populate('ownerId').populate("uploads")
    return await photoSpace;
}

export const removeUserFromPhotoSpace = async (_id?: ObjectId, userId?: ObjectId, options: { session?: any } = {}) => {
    const { session } = options
    const photoSpace = await PhotoSpace.findOneAndUpdate(
        {
            _id
        },
        {
            $unset: { users: userId }
        },
        { session }
    ).populate('ownerId').populate("uploads")
    return await photoSpace;
}