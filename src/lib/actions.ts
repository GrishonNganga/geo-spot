'use server'
import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth/next"
import { Payment, IPhotoSpace } from "@/lib/types"
import { redirect } from "next/navigation"
import { v4 as uuidv4 } from 'uuid';

import { validateCreatePhotoSpace } from "./validations"
import { findUser, getUser } from "./database/users"
import dbConnect from "./database/mongodb"
import { createPhotoSpace } from "./database/photospace"

export async function getSession() {
    const session = await getServerSession(authOptions)
    return session
}

const data: Payment[] = [
    {
        id: "m5gr84i9",
        amount: 316,
        status: "success",
        email: "ken99@yahoo.com",
    },
    {
        id: "3u1reuv4",
        amount: 242,
        status: "success",
        email: "Abe45@gmail.com",
    },
    {
        id: "derv1ws0",
        amount: 837,
        status: "processing",
        email: "Monserrat44@gmail.com",
    },
    {
        id: "5kma53ae",
        amount: 874,
        status: "success",
        email: "Silas22@gmail.com",
    },
    {
        id: "bhqecj4p",
        amount: 721,
        status: "failed",
        email: "carmella@hotmail.com",
    },
]

export async function getData() {
    return data
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