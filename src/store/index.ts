import { IPhotoSpace } from '@/lib/types'
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