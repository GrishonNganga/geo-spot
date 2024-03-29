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
    ownerId?: IUser,
    invitations?: String[],
    access: boolean,
    uploads?: IUpload[]
}

export type IUpload = {
    _id?: ObjectId,
    userId?: IUser,
    photoSpaceId?: ObjectId,
    photos?: { url: string, metadata: any }[]
}

export type IPhoto = {
    url: String,
    metadata: {
        make?: string,
        location: string,
        description: string
    }
}
export type Point = google.maps.LatLngLiteral & IPhoto & { key: string };