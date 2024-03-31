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
import { FileIcon, TrashIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import exifr from 'exifr'
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Autocomplete, Libraries, useJsApiLoader } from "@react-google-maps/api"
import { toast } from "sonner"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "@/lib/firebase"
import { createUploadAction } from "@/lib/actions"
import { IPhoto, IPhotoSpace } from "@/lib/types"

import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { photoSpaceStore } from "@/store"
import { useRouter } from "next/navigation"

const libraries: Libraries = ['places'];

export default function AddPhotosModal({ open, setOpen }: { open: boolean, setOpen: () => void }) {
    const [uploads, setUploads] = useState<any>([])
    const [uploadingInProgress, setUploadInProgress] = useState(false)

    const photoSpace = photoSpaceStore(state => state.photoSpace)
    const setPhotoSpace = photoSpaceStore(state => state.setPhotoSpace)

    const router = useRouter()
    const fileInputRef = useRef<any>(null)
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries
    })

    useEffect(() => {
        const saveUploads = async (uploads: any) => {
            const response = await createUploadAction({ photos: uploads, photoSpaceId: photoSpace!._id })
            setUploadInProgress(false)
            if (response) {
                toast.success("Photos added successfully")
                const newPhotoSpace = photoSpace
                newPhotoSpace!.uploads = (photoSpace?.uploads ? [...photoSpace.uploads, response] : [response])
                setPhotoSpace(newPhotoSpace)
                router.refresh()
                setTimeout(() => {
                    setUploads([])
                    setOpen()
                }, 1000)
            } else {
                toast.error("Photos have not been added. Please try again")
            }
        }

        if (uploadingInProgress) {
            let failed
            for (const upload of uploads) {
                if (!upload.url || !upload.metadata) {
                    failed = true
                    break
                }
            }
            if (failed) {
                return
            }
            const filteredUploads = uploads.map((upload: IPhoto) => ({ url: upload.url, metadata: upload.metadata }))
            saveUploads(filteredUploads)
        }
    }, [uploads, uploadingInProgress, photoSpace, photoSpace?._id, setOpen])

    function handleUpload(e: any, preventDefault?: boolean) {
        if (preventDefault) {
            e.preventDefault()
        }
        let fileList
        fileList = e.target.files || e.dataTransfer.files;
        const filesArray = Array.from(fileList);
        const filesArryWithAddedData = filesArray.map(async (file: any, idx: number) => {
            if (file && file.name) {
                const output = await exifr.parse(file)
                const reader = new FileReader();
                let fileObj: any = {}
                fileObj.file = file

                reader.readAsDataURL(file);

                const d = reader.onload = (e) => {
                    if (!e) { return }
                    fileObj.preview = e.target!.result
                    fileObj.metadata = output
                    setUploads((prevState: any) => ([...prevState, fileObj]))
                }
            };
        })
    }
    const onPlaceChanged = (id: number, e: any) => {
        if (e) {
            const placeId = e.value.place_id
            geocodeByPlaceId(placeId)
                .then(results => {
                    const latitude = results[0]?.geometry?.location?.lat()
                    const longitude = results[0]?.geometry?.location?.lng()
                    const locationName = results[0].formatted_address
                    setUploads((prevState: any) => {
                        prevState[id].metadata = {
                            ...(prevState[id]?.metadata ? prevState[id]?.metadata : {}),
                            location: locationName,
                            latitude,
                            longitude
                        }
                        return [...prevState]
                    })
                })
                .catch(error => console.error(error));
        }

    }

    const uploadFileToFirebase = (file: any) => {
        const storageRef = ref(storage, `/files/images/${file.name}_${new Date().getTime()}`)
        const resp = uploadBytesResumable(storageRef, file)
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
        setUploadInProgress(true)
        for (const [index, photo] of uploads.entries()) {
            const uploadTask = uploadFileToFirebase(photo.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = snapshot.totalBytes === 0 ? 0 : Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
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
                                        <Button size="sm" variant="outline" onClick={() => { fileInputRef.current!.click() }}>
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
                                                <div className="relative w-40 h-40 ">
                                                    <Image className="absolute w-full h-full object-cover rounded-lg" src={upload.uploadStatus ? "/loading.gif" : upload.preview} width={100} height={100} alt={"Uploaded file"} />
                                                </div>
                                                <div className="grow-0 flex-none">
                                                    {
                                                        <div className="mb-3 grow-0 flex-none">
                                                            <Label htmlFor="">
                                                                Search for Location
                                                            </Label>
                                                            <GooglePlacesAutocomplete
                                                                selectProps={{
                                                                    value: upload?.location,
                                                                    onChange: (e) => { onPlaceChanged(idx, e) },
                                                                    styles: {
                                                                        control: (provided) => ({
                                                                            ...provided,
                                                                            borderRadius: 14,
                                                                            // borderColor: provided.isFocused ? 'hotpink' : "green", // Set border color when focused
                                                                            '&:hover': {
                                                                                borderColor: 'hotpink', // Set border color on hover
                                                                            },
                                                                            boxShadow: provided.isFocused ? 'green' : 'red', // Add focus ring when focused
                                                                            maxWidth: '200px'
                                                                        }),
                                                                        input: (provided) => ({
                                                                            ...provided,
                                                                            color: 'black',
                                                                            borderColor: 'hotpink',
                                                                            borderRadius: 16
                                                                        }),
                                                                        option: (provided) => ({
                                                                            ...provided,
                                                                            color: 'black',
                                                                            borderRadius: 16
                                                                        }),
                                                                        singleValue: (provided) => ({
                                                                            ...provided,
                                                                            color: 'black',
                                                                            borderRadius: 16
                                                                        }),
                                                                    },
                                                                }}
                                                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}
                                                                apiOptions={{ libraries: ["places"] }}
                                                            />
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
                    <Button type="submit" disabled={uploadingInProgress} onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}
