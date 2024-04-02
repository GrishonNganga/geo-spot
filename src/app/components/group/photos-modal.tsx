import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { Label } from "@/components/ui/label"
import { Libraries, useJsApiLoader } from "@react-google-maps/api"
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { IPhoto, IUpload } from "@/lib/types";
import exifr from 'exifr'
import { FileIcon, PlusIcon, Trash2Icon, TrashIcon } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { storage } from "@/lib/firebase"
import { createUploadAction } from "@/lib/actions"
import { toast } from "sonner"
import { photoSpaceStore } from "@/store"
import { useRouter } from "next/navigation"
import CreatableSelect from 'react-select/creatable';
import { cn } from "@/lib/utils"
import React, { KeyboardEventHandler } from 'react';

const components = {
    DropdownIndicator: null,
};

interface Option {
    readonly label: string;
    readonly value: string;
}

const createOption = (label: string) => ({
    label,
    value: label,
});

const libraries: Libraries = ['places'];

export default function AddPhotosModal({ open, setOpen }: { open: boolean, setOpen: () => void }) {
    const [uploads, setUploads] = useState<IUpload>()
    const [uploadingInProgress, setUploadInProgress] = useState(false)
    const [photos, setPhotos] = useState<any>([])
    const [selectedLocation, setSelectedLocation] = useState<{ value: any, label: string } | undefined>()
    const [inputValue, setInputValue] = useState('');
    const [treeKinds, setTreeKinds] = useState<Option[]>([]);

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
        const saveUploads = async (photos: any) => {
            const trees = treeKinds.map(v => ({ name: v.value }))
            if (trees.length == 0) {
                toast.error("", {
                    description: "Emails not provided",
                })
                return
            }
            const response = await createUploadAction({ photos: photos, ...uploads, treeTypes: trees, photoSpaceId: photoSpace!._id })
            setUploadInProgress(false)
            if (response) {
                toast.success("Photos added successfully")
                const newPhotoSpace = photoSpace
                newPhotoSpace!.uploads = (photoSpace?.uploads ? [...photoSpace.uploads, response] : [response])
                setPhotoSpace(newPhotoSpace)
                router.refresh()
                setTimeout(() => {
                    setPhotos([])
                    setOpen()
                }, 1000)
            } else {
                toast.error("Photos have not been added. Please try again")
            }
        }

        if (uploadingInProgress) {
            let failed
            for (const photo of photos) {
                if (!photo.url) {
                    failed = true
                    break
                }
            }
            if (failed) {
                return
            }
            const filteredPhotos = photos.map((photo: IPhoto) => ({ url: photo.url, metadata: photo.metadata }))
            saveUploads(filteredPhotos)
        }
    }, [photos, uploadingInProgress, photoSpace, photoSpace?._id, setOpen])

    const uploadFileToFirebase = (file: any) => {
        const storageRef = ref(storage, `/files/images/${file.name}_${new Date().getTime()}`)
        const resp = uploadBytesResumable(storageRef, file)
        return resp
    }

    const handleSubmit = async () => {
        let failed
        if (failed) { return }
        setUploadInProgress(true)
        for (const [index, photo] of photos.entries()) {
            const uploadTask = uploadFileToFirebase(photo.file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const prog = snapshot.totalBytes === 0 ? 0 : Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setPhotos((prevState: any) => {
                        prevState[index] = { ...prevState[index], uploadStatus: true, uploadProgress: prog }
                        return [...prevState]
                    })
                },
                (err) => { },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setPhotos((prevState: any) => {
                            prevState[index] = { ...prevState[index], uploadStatus: false, url: url }
                            return [...prevState]
                        })
                    });
                }
            );
        }
    }

    const handleChange = (val: any) => {
        setTreeKinds(val);
    }

    const handleInput = async (handleInput: string) => {
        if (!inputValue) return
        const exists = treeKinds.find(op => op.value === inputValue)
        if (exists) {
            toast.error("", {
                description: "Tree type already added",
            })
            return
        }
        setTreeKinds(prevState => [...prevState, createOption(inputValue)])
        setInputValue('');
    }

    const handleKeyDown: KeyboardEventHandler = async (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                handleInput(inputValue)
                event.preventDefault();
        }
    };

    const onPlaceChanged = (e: any) => {
        if (e.value.place_id) {
            const placeId = e.value.place_id
            geocodeByPlaceId(placeId)
                .then(results => {
                    const latitude = results[0]?.geometry?.location?.lat()
                    const longitude = results[0]?.geometry?.location?.lng()
                    const locationName = results[0].formatted_address
                    setUploads(prevState => ({
                        ...prevState,
                        location: {
                            location: locationName,
                            latitude,
                            longitude,
                        }
                    }))
                    setSelectedLocation({ value: e.value, label: e.label })
                })
                .catch(error => console.error(error));
        }

    }

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
                    setPhotos((prevState: any) => ([...prevState, fileObj]))
                }
            };
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl max-h-screen overflow-y-scroll">
                <DialogHeader>
                    <DialogTitle>Added planted trees</DialogTitle>
                    <DialogDescription>
                        Trees that you planted
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-y-3">
                    <div className="mb-3  flex-none w-full">
                        <Label htmlFor="">
                            Location you planted
                        </Label>
                        <GooglePlacesAutocomplete
                            selectProps={{
                                placeholder: "Search for a location",
                                value: selectedLocation,
                                onChange: (e) => { onPlaceChanged(e) },

                                styles: {
                                    control: (provided) => ({
                                        ...provided,
                                        borderRadius: 14,
                                        backgroundColor: 'primary',
                                        color: 'text-foreground',
                                        borderColor: 'lightgreen',
                                        '&:hover': {
                                            // Set border color on hover
                                        },
                                        boxShadow: 'lightgreen', // Add focus ring when focused
                                    }),
                                    input: (provided) => ({
                                        ...provided,
                                        color: 'foreground',
                                        borderColor: 'lightgreen',
                                        borderRadius: 16
                                    }),
                                    option: (provided) => ({
                                        ...provided,
                                        backgroundColor: provided.isSelected ? "lightgreen" : "",
                                        '&:hover': {
                                            backgroundColor: 'lightgreen',
                                        },
                                        '&:active': {
                                            backgroundColor: 'lightgreen',
                                        },
                                        color: 'text-primary',
                                        borderRadius: 16
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: 'foreground',
                                        backgroundColor: 'primary',
                                        borderRadius: 16
                                    }),
                                    menu: (provided) => ({
                                        ...provided,
                                        backgroundColor: 'background',
                                    }),
                                },
                            }}
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string}
                            apiOptions={{ libraries: ["places"] }}
                        />
                    </div>
                    <div className="mb-3">
                        <Label htmlFor="trees">Trees planted</Label>
                        <Input
                            name="trees"
                            type="number"
                            placeholder="How many trees did you plant?"
                            step={1}
                            min={1}
                            onChange={(e) => { setUploads(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                        />
                    </div>
                    <div>
                        <Label htmlFor="trees">Trees types</Label>
                        <CreatableSelect
                            className={cn("w-full placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50")}
                            theme={(theme) => ({
                                ...theme,
                                borderRadius: 16,
                                colors: {
                                    ...theme.colors,
                                    primary25: 'lightgreen',
                                    primary: 'lightgreen',
                                },
                            })}
                            components={components}
                            inputValue={inputValue}
                            isClearable
                            isMulti
                            menuIsOpen={false}
                            onChange={handleChange}
                            onBlur={() => handleInput(inputValue)}
                            onInputChange={(newValue) => setInputValue(newValue)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add Trees..."
                            value={treeKinds}
                        />
                    </div>
                    <input
                        type="file"
                        id="file"
                        accept=".jpg, .png, .heif,"
                        className="hidden"
                        ref={fileInputRef}
                        multiple
                        onChange={handleUpload} />
                    {
                        photos.length === 0 &&
                        <div className="border border-dashed rounded-lg border-gray-200/40 border-gray-800 dark:border-gray-200 p-4"
                            onDrop={(e) => handleUpload(e, true)}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <div className="grid w-full items-center text-center gap-0">
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
                                        </p>
                                        <p className="text-sm text-gray-500 mt-2">JPEG, PNG, GIF. Max file size 10MB.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        photos.length > 0 &&
                        <div className="">

                            <ul className="flex flex-wrap gap-4">
                                {
                                    photos.map((photo: any, idx: number) => {
                                        return (
                                            <li key={idx} className="flex items-center space-x-2 items-center w-1/4 h-full aspect-square border rounded-md">
                                                <div className="relative w-full h-full">
                                                    <Image className="w-full h-full object-cover rounded-md aspect-square" src={photo.uploadStatus ? "/loading.gif" : photo.preview} width={100} height={100} alt={"Uploaded file"} />
                                                    <div className="absolute top-0 w-full h-full">
                                                        <div className="flex justify-end p-1">
                                                            <Button className="bg-white rounded-full" variant={"ghost"} size="icon">
                                                                <Trash2Icon className="w-4 h-4 text-red-400" />
                                                                <span className="sr-only">Remove</span>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                                <div className="flex justify-center items-center mt-3">
                                    <Button variant={"outline"} size="icon" onClick={() => { fileInputRef.current!.click() }}>
                                        <PlusIcon className="w-4 h-4" />
                                        <span className="sr-only">Remove</span>
                                    </Button>
                                </div>
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