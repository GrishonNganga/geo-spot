import Space from "@/app/components/photoSpace/space"

export default function Page({ params }: {
    params: { photoSpace: string }
}) {
    return (
        <Space params={params} />
    )
}