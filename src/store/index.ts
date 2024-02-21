import { IPhotoSpace } from '@/lib/types'
import { create } from 'zustand'

type PhotoStore = {
    open: string | null
    setOpen: (newState: string | null) => void
}

export const photoStore = create<PhotoStore>()((set) => ({
    open: null,
    setOpen: (newState: string | null) => set(() => ({ open: newState })),
}))

type PhotoSpaceStore = {
    photoSpace: IPhotoSpace | null
    setPhotoSpace: (newState: IPhotoSpace | null) => void
}

export const photoSpaceStore = create<PhotoSpaceStore>()((set) => ({
    photoSpace: null,
    setPhotoSpace: (newState: IPhotoSpace | null) => set(() => ({ photoSpace: newState })),
}))