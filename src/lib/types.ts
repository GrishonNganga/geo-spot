import { ObjectId, Document } from "mongoose"

export type IUser = {
    _id?: ObjectId,
    name: String,
    email: String,
    image?: String,
} & Document

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
} & Document

export type IPhotoSpace = {
    _id?: ObjectId,
    spaceId?: String,
    name: string,
    ownerId?: ObjectId,
    invitations?: String[],
    access: boolean,
    uploads?: IUpload[]
} & Document

export type IUpload = {
    _id?: ObjectId,
    userId?: ObjectId | IUser,
    photoSpaceId?: ObjectId,
    photos?: { url: string, metadata: any }[]
} & Document

export type Point = google.maps.LatLngLiteral & { key: string, url: string, metadata: { make?: string, location: string, description: string } };