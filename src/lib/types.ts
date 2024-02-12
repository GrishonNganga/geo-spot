import { ObjectId } from "mongoose"

export type IUser = {
    _id?: ObjectId,
    name: String | null | undefined,
    email: String,
    image?: String | null | undefined,
}