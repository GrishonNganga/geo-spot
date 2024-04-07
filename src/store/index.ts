import { IEvent, IPhotoSpace } from '@/lib/types'
import { create } from 'zustand'

type PhotoStore = {
    open: string | undefined
    setOpen: (newState: string | undefined) => void
}

export const photoStore = create<PhotoStore>()((set) => ({
    open: undefined,
    setOpen: (newState: string | undefined) => set(() => ({ open: newState })),
}))

type PhotoSpaceStore = {
    photoSpace: IPhotoSpace | undefined
    setPhotoSpace: (newState: IPhotoSpace | undefined) => void
}

export const photoSpaceStore = create<PhotoSpaceStore>()((set) => ({
    photoSpace: undefined,
    setPhotoSpace: (newState: IPhotoSpace | undefined) => set(() => ({ photoSpace: newState })),
}))

type ModalsStore = {
    sendInvitationModal: boolean
    setSendInvitationModal: (newState: boolean) => void
    addPhotosModal: boolean
    setAddPhotosModal: (newState: boolean) => void
}

export const modalsStore = create<ModalsStore>()((set) => ({
    sendInvitationModal: false,
    addPhotosModal: false,
    setSendInvitationModal: (newState: boolean) => set(() => ({ sendInvitationModal: newState })),
    setAddPhotosModal: (newState: boolean) => set(() => ({ addPhotosModal: newState })),

}))

type EventStore = {
    event: IEvent | undefined
    setEvent: (newState: IEvent | undefined) => void
}

export const eventStore = create<EventStore>()((set) => ({
    event: undefined,
    setEvent: (newState: IEvent | undefined) => set(() => ({ event: newState })),
}))