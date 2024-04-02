'use client'
import { IPhotoSpace } from "@/lib/types";
import { photoSpaceStore } from "@/store";
import { useEffect } from "react";
import MyMap from "../map/map";
import Header from "./header";
import Members from "./members";
import Trees from "./trees"
import 'react-circular-progressbar/dist/styles.css';
import Intro from "./intro";
import PrivateGeneralStats from "./stats/private-general-stats";
import PublicGeneralStats from "./stats/public-general-stats";

export default function SpaceContainer({ photoSpace }: { photoSpace: IPhotoSpace }) {
    const setPhotoSpace = photoSpaceStore(state => state.setPhotoSpace)
    const ps = photoSpaceStore(state => state.photoSpace)

    useEffect(() => {
        setPhotoSpace(photoSpace)
    }, [photoSpace, setPhotoSpace])

    return (
        <div className="lg:container">
            <div className="w-full h-52">
                <MyMap classNames="lg:rounded-md overflow-hidden" uploads={photoSpace.uploads} />
            </div>
            <div className="container lg:px-0 flex flex-col gap-y-5">
                <Header name={photoSpace.name} photo="" description={photoSpace.description} access={photoSpace.access} />
                <div className="flex flex-col lg:flex-row gap-x-8 gap-y-5">
                    <Intro description={photoSpace.description} />
                    {
                        //Private groups
                        !photoSpace.access &&
                        <PrivateGeneralStats uploads={photoSpace.uploads} members={(photoSpace.invitations?.length || 0) + 1} target={photoSpace.target} deadline={photoSpace.deadline} />
                        ||
                        <PublicGeneralStats trees={100} members={10} completion={10} daysRemaining={354} />
                    }
                </div>
                <div className="flex flex-col lg:flex-row gap-x-8">
                    <div className="lg:w-1/2">
                        <Members invitations={[photoSpace.ownerId!.email, ...(photoSpace.invitations ? [...photoSpace.invitations] : [])]} />
                    </div>
                    <div className="lg:w-1/2">
                        <Trees uploads={photoSpace.uploads} />
                    </div>
                </div>
            </div>
        </div>
    )
}