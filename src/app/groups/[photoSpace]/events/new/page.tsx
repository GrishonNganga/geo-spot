import NewEventContainer from "./events-container";

export default function Page({ params }: {
    params: { photoSpace: string }
}) {
    return (
        <NewEventContainer params={params} />
    )
}