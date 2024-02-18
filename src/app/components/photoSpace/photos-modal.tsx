'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { FileIcon, TrashIcon, XIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import exifr from 'exifr'
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api"
import { toast } from "sonner"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "@/lib/firebase"

const libraries = ['places'];

export default function AddPhotosModal({ open, setOpen }: { open: boolean, setOpen: () => void }) {
    const [uploads, setUploads] = useState<any>([])
    const [locationAutoComplete, setLocationAutoComplete] = useState(null)

    const fileInputRef = useRef(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries
    })

    useEffect(() => {
        console.log("Uploads", uploads)
        uploads.forEach((upload: any, idx: number) => {
            uploadFile(upload, idx)
        })
    }, [uploads])

    function handleUpload(e, preventDefault?: boolean) {
        if (preventDefault) {
            e.preventDefault()
        }
        let fileList
        fileList = e.target.files || e.dataTransfer.files;
        const filesArray = Array.from(fileList);
        setUploads((prevState: any) => ([...prevState, ...filesArray]))

    }

    const uploadFile = async (file: any, index: number) => {
        if (file && file.name) {
            const output = await exifr.parse(file)
            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = (e) => {
                if (!e) { return }
                file.preview;
                console.log("Output", output)
                file.metadata = output

                setUploads((prevState: any) => {
                    prevState[index] = { ...prevState[index], 'preview': e.target.result, ...file }
                    return [...prevState]
                })
            }
            return true;
        };

    }

    const onPlaceChanged = (id: number) => {
        console.log("IDDDD", id)
        console.log("AA", locationAutoComplete)
        if (locationAutoComplete && locationAutoComplete[id] && locationAutoComplete[id].getPlace()) {
            console.log("E", locationAutoComplete[id].getPlace())
            const latitude = locationAutoComplete[id]?.getPlace()?.geometry?.location?.lat()
            const longitude = locationAutoComplete[id]?.getPlace()?.geometry?.location?.lng()
            const locationName = locationAutoComplete[id]?.getPlace().formatted_address
            setUploads((prevState: any) => {
                prevState[id].metadata = {
                    ...(prevState[id]?.metadata ? prevState[id]?.metadata : {}),
                    location: locationName,
                    latitude,
                    longitude
                }
                return [...prevState]
            })
        }
    }

    const onLoad = (autocomplete: any, idx: number) => {
        setLocationAutoComplete((prevState: any) => ({ ...(prevState ? prevState : {}), [idx]: autocomplete }))
    }


    const uploadFileToFirebase = (file: any) => {
        const storageRef = ref(storage, `/files/images/${file.name}_${new Date().getTime()}`)
        const resp = uploadBytesResumable(storageRef, file)
        console.log("RES", resp)
        return resp
    }
    const handleSubmit = async () => {
        let failed
        for (const photo of uploads) {
            if (!photo?.metadata?.longitude || !photo?.metadata?.latitude) {
                toast.error("Ensure all photos have location set")
                failed = true
                break;
            }
        }
        if (failed) { return }
        for (const [index, photo] of uploads.entries()) {
            const uploadTask = uploadFileToFirebase(photo);
            console.log("T", uploadTask)
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    console.log("SS", snapshot.totalBytes)
                    const prog = snapshot.totalBytes === 0 ? 0 : Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    console.log("PR", prog)
                    setUploads((prevState: any) => {
                        prevState[index] = { ...prevState[index], uploadStatus: true, uploadProgress: prog }
                        return [...prevState]
                    })
                },
                (err) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setUploads((prevState: any) => {
                            prevState[index] = { ...prevState[index], uploadStatus: false, url: url }
                            return [...prevState]
                        })
                    });
                }
            );
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-5xl max-h-screen overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>Add photos</DialogTitle>
                    <DialogDescription>
                        Photos you add will appear on the map
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4">

                    <div className="border border-dashed rounded-lg border-gray-200/40 border-gray-800 dark:border-gray-200"
                        onDrop={(e) => handleUpload(e, true)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <div className="h-[300px] grid w-full items-center text-center gap-0">
                            <div className="flex flex-col justify-between gap-y-5">
                                <div>
                                    <FileIcon className="mx-auto w-12 h-12 text-gray-500 dark:text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Drag and drop your files here or &nbsp;
                                        <Button size="sm" variant="outline" onClick={() => { fileInputRef.current.click() }}>
                                            Browse
                                        </Button>
                                        <input
                                            type="file"
                                            id="file"
                                            accept=".jpg, .png, .heif,"
                                            className="hidden"
                                            ref={fileInputRef}
                                            multiple
                                            onChange={handleUpload} />
                                    </p>
                                    <p className="text-sm text-gray-500 mt-2">JPEG, PNG, GIF. Max file size 10MB.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        uploads.length > 0 &&
                        <div className="space-y-2.5">
                            <ul className="flex flex-wrap gap-8">
                                {
                                    uploads.map((upload: any, idx: number) => {
                                        return (
                                            <li key={idx} className="flex items-center space-x-2 p-3 items-center">
                                                <Image className="w-40 h-40 object-cover rounded-lg" src={upload.preview} width={100} height={100} alt={"Uploaded file"} />
                                                <div className="">
                                                    {
                                                        isLoaded &&
                                                        <div className="mb-3">
                                                            <Label htmlFor="">
                                                                Search for Location
                                                            </Label>
                                                            <Autocomplete
                                                                onPlaceChanged={() => { onPlaceChanged(idx) }}
                                                                onLoad={(e) => { onLoad(e, idx) }}
                                                                className="z-100"
                                                            >
                                                                <Input name={`newCoordinate-${idx}`} placeholder="Search for location" />
                                                            </Autocomplete>
                                                        </div>
                                                    }
                                                    <Input name={`oldCoordinate-${idx}`} disabled value={`${upload?.metadata?.longitude || 0},${upload?.metadata?.latitude || 0}`} />
                                                </div>
                                                <Button variant={"ghost"} className="ml-auto" size="icon">
                                                    <TrashIcon className="w-4 h-4 text-red-400" />
                                                    <span className="sr-only">Remove</span>
                                                </Button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    }
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
