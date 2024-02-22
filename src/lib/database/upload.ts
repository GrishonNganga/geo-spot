import { ObjectId } from "mongoose";
import { IUpload } from "../types";
import PhotoSpace from "@/models/PhotoSpace";
import Upload from "@/models/Upload";

export const createUpload = async (data: IUpload | IUpload[]) => {
    const uploads = new Upload(data);
    return await uploads.save();
}

export const findUpload = async (data: any) => {
    const upload = Upload.findOne(data)
    return await upload;
}

export const findUploads = async (data: any) => {
    const upload = Upload.find(data)
    return await upload;
}

export const getUpload = async (_id: ObjectId) => {
    const upload = Upload.findOne({ _id })
    return await upload;
}

interface UpdateObject {
    $addToSet?: { [key: string]: any };
    $set?: { [key: string]: any };
}

export const updateUpload = async (_id: ObjectId, data: any) => {
    let updateObject: UpdateObject = { $addToSet: {} };
    for (const key of Object.keys(data)) {
        if (Array.isArray(data[key])) {
            updateObject.$addToSet = { [key]: data[key] };
        } else {
            updateObject.$set = { key: data[key] };
        }
    }
    const upload = await Upload.findOneAndUpdate({
        _id
    }, updateObject,
        { upsert: false, new: true })
    return await upload;
}