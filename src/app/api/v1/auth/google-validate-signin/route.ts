import dbConnect from "@/lib/database/mongodb";
import { createUser } from "@/lib/database/users";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest, _res: NextResponse) => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user) {
        return redirect('/signup')
    }
    const connect = await dbConnect()
    if (!connect) {
        cookies().delete("next-auth.session-token")
        cookies().delete("next-auth.callback-url")
        cookies().delete("next-auth.csrf-token")
        return redirect(`/signup?status=error&message=Something wrong happened. Try again later`)
    }
    try {
        // Create a new user with the hashed password
        const user = await createUser({
            name: session.user.name,
            email: session.user.email || "",
            image: session.user?.image
        })
    } catch (err: any) {
        if (err.code === 11000) {
            return redirect('/dashboard')
        }
        if (err.name === 'ValidationError') {
            return new Response(JSON.stringify({ message: err.message }), { status: 422 });
        }
        console.log("ERRRR", err)
        cookies().set("next-auth.session-token", "")
        cookies().set("next-auth.callback-url", "")
        cookies().set("next-auth.csrf-token", "")
        return redirect(`/signup?status=error&message=${err.mesage}`)
    }
    return redirect('/dashboard')
}