import { getEventAction } from "@/lib/actions"
import { IEvent } from "@/lib/types"
import { Metadata } from "next"


export async function generateMetadata({ params }: {
    params: { event: string }
}): Promise<Metadata> {
    const eventId = params?.event
    const event: IEvent = await pullEvent(eventId)
    return {
        title: event.name as string,
        icons: "/icon.svg",
        description: event.description as string,
        openGraph: {
            images: [event.photo! as string],
        },
    }
}

const pullEvent = async (eventId: String) => {
    const response = await getEventAction({ _id: eventId })
    return JSON.parse(JSON.stringify(response.event))
}

export default function Layout({ params, children }: { children: React.ReactNode, params: { event: string } }) {
    return (
        <>
            {children}
        </>
    )
}