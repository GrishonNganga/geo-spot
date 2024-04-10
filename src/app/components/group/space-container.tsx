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
import Events from "./events";

export default function SpaceContainer({ photoSpace }: { photoSpace: IPhotoSpace }) {
    const setPhotoSpace = photoSpaceStore(state => state.setPhotoSpace)
    const ps = photoSpaceStore(state => state.photoSpace)

    useEffect(() => {
        setPhotoSpace(photoSpace)
    }, [photoSpace, setPhotoSpace])

    return (
        <div className="lg:container">
            <MyMap classNames="w-full h-52 lg:rounded-md overflow-hidden" uploads={photoSpace.uploads} expandMap />
            <div className="container lg:px-0 flex flex-col gap-y-5">
                <Header name={photoSpace.name} photo="" description={photoSpace.description} access={photoSpace.access} />
                <div className="flex flex-col lg:flex-row gap-x-8 gap-y-5">
                    <Intro description={photoSpace.description} />
                    {
                        //Private group
                        !photoSpace.access &&
                        <PrivateGeneralStats uploads={photoSpace.uploads} members={(photoSpace.invitations?.length || 0) + 1} target={photoSpace.target} deadline={photoSpace.deadline} />
                        //Public group
                        ||
                        <PublicGeneralStats members={photoSpace.users?.length || 0} trees={photoSpace.raised || 0} target={photoSpace.target || 0} deadline={photoSpace.deadline} />
                    }
                </div>
                {
                    //Private groups views Members
                    !photoSpace.access &&
                    <div className="flex flex-col lg:flex-row gap-x-8">
                        <div className="lg:w-1/2">
                            <Members invitations={[photoSpace.ownerId!.email, ...(photoSpace.invitations ? [...photoSpace.invitations] : [])]} />
                        </div>
                        <div className="lg:w-1/2">
                            <Trees uploads={photoSpace.uploads} />
                        </div>
                    </div>
                    //Public groups views Events
                    ||
                    <div className="flex flex-col lg:flex-row gap-x-5">
                        <div className="lg:w-1/2">
                            <Events />
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}