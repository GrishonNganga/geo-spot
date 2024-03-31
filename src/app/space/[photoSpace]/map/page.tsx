import Space from "@/app/components/map/space"

export default function Page({ params }: {
    params: { photoSpace: string }
}) {
    return (
        <Space params={params} />
    )
}