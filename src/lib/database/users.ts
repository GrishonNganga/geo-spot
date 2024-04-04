import { ObjectId } from "mongoose";
import { IUser } from "../types";
import User from "@/models/User"

interface UpdateObject {
    $addToSet?: { [key: string]: any };
    $set?: { [key: string]: any };
}

export const createUser = async (data: IUser) => {
    const user = new User(data);
    return await user.save();
}

export const findUser = async (data: any) => {
    const user = User.findOne(data)
    return await user;
}

export const findUsersByEmail = async (data: String[]) => {
    const users = User.find({
        'email': {
            $in: data
        }
    })
    return await users;
}

export async function findUsers(field: string, value: string | ObjectId | number, useAggregate: boolean = false) {
    try {
        if (useAggregate) {
            const users = await User.aggregate([
                {
                    $match: {
                        [field]: value
                    }
                }
            ]);
            return users;
        } else {
            const users = await User.find({ [field]: value });
            return users;
        }
    } catch (error) {
        console.error("Error finding users:", error);
        throw error;
    }
}

export const getUser = async (_id: ObjectId) => {
    const user = User.findOne({ _id })
    return await user;
}

export const updateUser = async (userId: ObjectId, data: any, options: { session?: any } = {}) => {
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
        const user = await User.findOneAndUpdate({
            _id: userId
        }, updateObject,
            { upsert: false, session })
        return await user;
    } catch (e) {
        console.error("Error finding users:", e);
        throw e;
    }

}