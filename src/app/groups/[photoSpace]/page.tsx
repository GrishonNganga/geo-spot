import Space from "@/app/components/group/space"

export default function Page({ params }: {
    params: { photoSpace: string }
}) {

    return (
        <Space params={params} />
    )
}