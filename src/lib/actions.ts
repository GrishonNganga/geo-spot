'use server'

import { authOptions } from "@/pages/api/auth/[...nextauth].js"
import { getServerSession } from "next-auth/next"

export async function getSession() {
    const session = await getServerSession(authOptions)
    return session
}