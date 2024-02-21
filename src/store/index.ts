import { create } from 'zustand'

type PhotoStore = {
    open: string | null
    setOpen: (newState: string | null) => void
}

export const photoStore = create<PhotoStore>()((set) => ({
    open: null,
    setOpen: (newState: string | null) => set(() => ({ open: newState })),
}))