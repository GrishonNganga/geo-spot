'use server'
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth/next"
import { IPhotoSpace, IUpload } from "@/lib/types"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from 'uuid';

import { validateCreatePhotoSpace } from "./validations"
import { findUser, findUsersByEmail } from "./database/users"
import dbConnect from "./database/mongodb"
import { createPhotoSpace, findPhotoSpaces, updatePhotoSpace } from "./database/photospace"
import { ObjectId } from "mongoose"
import { storage } from "./firebase"
import { ref, uploadBytesResumable } from "firebase/storage"
import { createUpload } from "./database/upload"

export async function getSession() {
    const session = await getServerSession(authOptions)
    return session
}

export async function getLoggedInUser() {
    const session = await getSession()
    await dbConnect()
    const user = await findUser({ email: session?.user?.email })
    return user
}

export async function getData(userId: ObjectId) {
    const photoSpaces = await findPhotoSpaces({ ownerId: userId })
    return JSON.parse(JSON.stringify(photoSpaces))
}

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
    const user = await findUser({ email: session?.user.email })
    if (!user) {
        return { status: false, message: "Can't create Photo Space without a Geospot account" }
    }
    const spaceId = uuidv4()
    try {
        const photoSpace = await createPhotoSpace({ ...data, spaceId, ownerId: user._id })
        if (photoSpace) {
            return { status: true, message: "Photo Space created successfully", data: JSON.parse(JSON.stringify(photoSpace)) }
        }
    } catch (e) {
        return { status: false, message: e.message }

    }
    return redirect("/dashboard")
}

export async function getPopulatedInvitations(emails: String[]) {
    const emailsExist = await findUsersByEmail(emails)
    const emailsNotExist: { email: String }[] = emails.filter(email => !emailsExist.find(e => e.email === email)).map(e => ({ email: e }))
    return [...emailsExist, ...emailsNotExist]
}

export async function updatePhotoSpaceAction(id: ObjectId, data: any) {
    const updated = await updatePhotoSpace(id, data)
    return JSON.parse(JSON.stringify((updated)))
}

export async function createUploadAction(data: IUpload | IUpload[]) {
    const user = await getLoggedInUser()
    const uploads = await createUpload({ ...data, userId: user._id })
    const updated = await updatePhotoSpace(data.photoSpaceId, { uploads: [uploads._id] })
    return JSON.parse(JSON.stringify(uploads))
}