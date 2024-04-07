import { ObjectId } from "mongoose"

export type IUser = {
    _id?: ObjectId,
    name: String,
    email: String,
    image?: String,
    groups?: ObjectId[],
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
    description?: string,
    target?: number,
    raised?: number,
    deadline?: Date
    ownerId?: IUser,
    invitations?: String[],
    access: boolean,
    uploads?: IUpload[],
    users?: ObjectId[]
}

export type IUpload = {
    _id?: ObjectId,
    userId?: IUser,
    location?: ILocation,
    trees?: number,
    treeTypes?: ITreeType[]
    photoSpaceId?: ObjectId,
    photos?: IPhoto[]
}

export type ILocation = {
    location: string,
    latitude: number,
    longitude: number
}

export type IPhoto = {
    url: String,
    metadata?: {
        make?: string,
        description?: string
    }
}
export type ITreeType = {
    name?: String,
    scientificName?: String,
    description?: String
}

export type IEvent = {
    _id?: ObjectId,
    name: String,
    description?: String,
    photo?: String,
    date?: Date,
    location?: ILocation,
    start?: Date,
    end?: Date,
    attendees?: IUser,
    price?: Number,
    target?: Number,
    capacity?: Number,
    owner?: ObjectId,
    group?: ObjectId
}
export type Point = google.maps.LatLngLiteral & { location: string, key: string, photos: IPhoto[] };