'use server'
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth/next"
import { IEvent, IPhotoSpace, IUpload, IUser } from "@/lib/types"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from 'uuid';

import { validateCreatePhotoSpace } from "./validations"
import { findUser, findUsers, findUsersByEmail, updateUser } from "./database/users"
import dbConnect from "./database/mongodb"
import { createPhotoSpace, findPhotoSpaces, updatePhotoSpace } from "./database/photospace"
import { ObjectId } from "mongoose"
import { createUpload } from "./database/upload"
import { cache } from "react"
import mongoose from "mongoose"
import { createEvent, findEvents } from "./database/events"

export async function getSession() {
    const session = await getServerSession(authOptions)
    return session
}

export async function getLoggedInUser() {
    const session = await getSession()
    const connect = await dbConnect()
    if (!connect) {
        return { status: false, message: "Something wrong happened!" }
    }
    const user = await findUser({ email: session?.user?.email })
    return user
}

export const getData = cache(async function getData(userId: ObjectId) {
    const connect = await dbConnect()
    if (!connect) {
        return { status: false, message: "Something wrong happened!" }
    }
    const photoSpaces = await findPhotoSpaces({ $or: [{ ownerId: userId }, { users: { $in: [userId] } }] })
    return JSON.parse(JSON.stringify(photoSpaces))
})

export async function createPhotoSpaceAction(data: IPhotoSpace) {
    const { status, message } = await validateCreatePhotoSpace(data)
    if (!status) {
        return { status: false, message }
    }
    const session = await getSession()
    if (!session) {
        return { status: false, message: "Can't create Photo Space without logged in user" }
    }
    const connect = await dbConnect()
    if (!connect) {
        return { status: false, message: "Something wrong happened!" }
    }
    const user = await findUser({ email: session!.user!.email })
    if (!user) {
        return { status: false, message: "Can't create Photo Space without a Geospot account" }
    }
    const spaceId = uuidv4()
    try {
        const photoSpace = await createPhotoSpace({ ...data, spaceId, ownerId: user._id })
        if (photoSpace) {
            return { status: true, message: "Photo Space created successfully", data: JSON.parse(JSON.stringify(photoSpace)) }
        }
    } catch (e: any) {
        return { status: false, message: e.message }

    }
    return redirect("/dashboard")
}

export async function getPopulatedInvitations(emails: String[]) {
    const connect = await dbConnect()
    if (!connect) {
        return { status: false, message: "Something wrong happened!" }
    }
    const emailsExist = await findUsersByEmail(emails)
    const emailsNotExist: { email: String }[] = emails.filter(email => !emailsExist.find(e => e.email === email)).map(e => ({ email: e }))
    return [...emailsExist, ...emailsNotExist]
}

export async function updatePhotoSpaceAction(id: ObjectId, data: any) {
    const connect = await dbConnect()
    if (!connect) {
        return { status: false, message: "Something wrong happened!" }
    }
    const updated = await updatePhotoSpace(id, data)
    return JSON.parse(JSON.stringify((updated)))
}

export async function createUploadAction(data: IUpload): Promise<IUpload> {
    const user = await getLoggedInUser()
    const uploads = await createUpload({ ...data, userId: user._id })

    const updated = await updatePhotoSpace(data.photoSpaceId, { uploads: [uploads._id] })
    return JSON.parse(JSON.stringify(uploads))
}

export async function joinGroupAction(data: { groupId: ObjectId }) {
    const user = await getLoggedInUser()

    const session = await mongoose.startSession();
    session.startTransaction();
    // public
    try {
        const updatedUser = await updateUser(user._id, { groups: [data.groupId] }, { session });
        const updatedPhotospace = await updatePhotoSpace(data.groupId, { users: [user._id] }, { session })
        console.log("UPS", updatedPhotospace)
        await session.commitTransaction();
        session.endSession();

        if (updatedUser && updatedPhotospace) {
            return JSON.parse(JSON.stringify({ user: updatedUser }))
        } else {
            return JSON.parse(JSON.stringify(null))
        }
    } catch (error) {
        // Abort the transaction in case of error
        await session.abortTransaction();
        session.endSession();

        throw error;
    }
}

export async function getPublicGroupStats(_id: ObjectId) {
    const usersCount = await findUsers("groupId", _id, true)
    return JSON.parse(JSON.stringify({ users: usersCount }))
}

export default async function getGroupEventsAction(_id: ObjectId) {
    const events = await findEvents("group", _id)
    if (events) {
        return JSON.parse(JSON.stringify({ events: events, status: "success" }))
    } else {
        return JSON.parse(JSON.stringify({ status: "error", message: "Something wrong happened" }))
    }
}

export const createEventAction = async (data: IEvent) => {
    const connected = await dbConnect()
    const user = await getLoggedInUser()
    const event = await createEvent({ ...data, owner: user._id })
    return JSON.parse(JSON.stringify(event))
}