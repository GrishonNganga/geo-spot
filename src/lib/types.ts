import { ObjectId } from "mongoose"

export type IUser = {
    _id?: ObjectId,
    name: String,
    email: String,
    image?: String,
}

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export type IPhotoSpace = {
    _id?: ObjectId,
    spaceId?: String,
    name: string,
    ownerId?: ObjectId,
    invitations?: String[],
    access: boolean,
    photos?: IUpload[]
}

export type IUpload = {
    _id?: ObjectId,
    userId: ObjectId,
    photoSpaceId: ObjectId,
    photos: String[]
}