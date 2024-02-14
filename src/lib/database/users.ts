import { ObjectId } from "mongoose";
import { IUser } from "../types";
import User from "@/models/User"

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

export const getUser = async (_id: ObjectId) => {
    const user = User.findOne({ _id })
    return await user;
}

export const updateUser = async (userId: ObjectId, data: any) => {
    const user = await User.findOneAndUpdate({
        _id: userId
    }, {
        $set: data,
    },
        { upsert: false })
    return await user;
}