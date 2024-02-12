'use client'
import { signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Logo from "../landing-page/logo"
import { useEffect, useState } from "react"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"

export function Authenticated({ session }: { session: any }) {
    return redirect('/dashboard')
}

export function UnAuthenticated() {
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    const status = searchParams?.get('status') || null
    const message = searchParams?.get('message') || ""

    useEffect(() => {
        if (status == "error") {
            toast.error(message)
            const t = setTimeout(() => {
                router.replace("/signup")
            }, 3000)
            return () => { clearTimeout(t) }
        }

    }, [])

    return (
        <div className="container pt-5 relative h-dvh">
            <div className="mb-10 flex justify-center lg:justify-start absolute">
                <Logo />
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center">

                <div className="grid gap-6 w-full max-w-sm">
                    <div className="space-y-2 text-center">

                        <h1 className="text-3xl font-bold">Welcome aboard</h1>
                        <p className="text-gray-500 dark:text-gray-400">Sign up with your Google account</p>
                    </div>
                    <Button disabled={loading} className="w-full" onClick={() => { setLoading(true); signIn("google", { callbackUrl: "/api/v1/auth/google-validate-signin" }) }}>Sign up with Google</Button>
                </div>
            </div>
        </div>
    )
}
