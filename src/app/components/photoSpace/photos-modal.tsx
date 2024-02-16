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
import { uploadFileAction } from "@/lib/actions"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Autocomplete, useJsApiLoader } from "@react-google-maps/api"

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
                file.preview = e.target.result;
                console.log("Output", output)
                file.metadata = output
                // const uploadTask = uploadFileAction(f);
                // uploadTask.on(
                //     "state_changed",
                //     (snapshot) => {
                //         const prog = Math.round(
                //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                //         );
                //         setUploadProgress(prog);
                //     },
                //     (err) => { },
                //     () => {
                //         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                //             setThumbnailName(files[0].name);
                //             setSongObject((prevState) => ({ ...prevState, thumbnail: url }));
                //             setIsUploadingThumbnail(false);
                //         });
                //     }
                // );
                setUploads((prevState: any) => {
                    prevState[index] = { ...prevState[index], ...file }
                    return [...prevState]
                })
            }
            return true;
        };

    }

    const onPlaceChanged = (id: number) => {
        console.log("IDDDD", id)
        console.log("AA", locationAutoComplete)
        if (locationAutoComplete && locationAutoComplete.getPlace()) {
            console.log("E", locationAutoComplete.getPlace())
            const latitude = locationAutoComplete?.getPlace()?.geometry?.location?.lat()
            const longitude = locationAutoComplete?.getPlace()?.geometry?.location?.lng()
            const locationName = locationAutoComplete?.getPlace().formatted_address
            setUploads((prevState: any) => {
                prevState[id].metadata = {
                    ...(prevState[id]?.metadata ? prevState[id]?.metadata : {}),
                    location: locationName,
                    latitude,
                    longitude
                }

                console.log("OLV", prevState[id])
                return [...prevState]
            })
        }
    }

    const onLoad = (autocomplete) => {
        setLocationAutoComplete(autocomplete)
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
                                                                onLoad={onLoad}
                                                                className="z-100"
                                                            >
                                                                <Input name={`newCoordinate-${idx}`} placeholder="Search for location" />
                                                            </Autocomplete>
                                                        </div>
                                                    }
                                                    <Input name="oldCoordinates" disabled value={`${upload?.metadata?.longitude || 0},${upload?.metadata?.latitude || 0}`} />
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
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
