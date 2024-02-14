import { ObjectId } from "mongoose";
import { IPhotoSpace } from "../types";
import User from "@/models/User"
import PhotoSpace from "@/models/PhotoSpace";

export const createPhotoSpace = async (data: IPhotoSpace) => {
    const photoSpace = new PhotoSpace(data);
    return await photoSpace.save();
}

export const findPhotoSpace = async (data: any) => {
    const photoSpace = PhotoSpace.findOne(data).populate('ownerId')
    return await photoSpace;
}

export const getPhotoSpace = async (_id: ObjectId) => {
    const photoSpace = PhotoSpace.findOne({ _id })
    return await photoSpace;
}

export const updatePhotoSpace = async (_id: ObjectId, data: any) => {
    const photoSpace = await User.findOneAndUpdate({
        _id
    }, {
        $set: data,
    },
        { upsert: false })
    return await photoSpace;
}