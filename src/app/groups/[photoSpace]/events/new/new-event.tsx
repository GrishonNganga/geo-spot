'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CalendarIcon, Trash2Icon, Upload } from "lucide-react";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";
import { useRef, useState } from "react";
import { IEvent, IPhotoSpace } from "@/lib/types";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { Libraries, useJsApiLoader } from "@react-google-maps/api"

import Image from "next/image";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { toast } from "sonner";
import { validateCreateEvent } from "@/lib/validations";

import { createEventAction } from "@/lib/actions";
import { CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const libraries: Libraries = ['places'];

export default function NewEvent({ group }: { group: IPhotoSpace }) {
    const [event, setEvent] = useState<IEvent>({
        name: "",
        description: ""
    })
    const [selectedLocation, setSelectedLocation] = useState<{ value: any, label: string } | undefined>()
    const [uploadProgress, setUploadProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)

    const router = useRouter()

    const fileInputRef = useRef<any>(null)

    const onPlaceChanged = (e: any) => {
       
        if (e.value.place_id) {
            const placeId = e.value.place_id
            geocodeByPlaceId(placeId)
                .then(results => {
                    const latitude = results[0]?.geometry?.location?.lat()
                    const longitude = results[0]?.geometry?.location?.lng()
                    const locationName = results[0].formatted_address
                    setEvent(prevState => ({
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

    const uploadFileToFirebase = (file: any) => {
        const storageRef = ref(storage, `/files/images/${file.name}_${new Date().getTime()}`)
        const resp = uploadBytesResumable(storageRef, file)
        return resp
    }

    function handleUpload(e: any) {
        const fileList = e.target.files || e.dataTransfer.files;
        setUploading(true)
        const uploadTask = uploadFileToFirebase(fileList[0]);
        e.target.value = null
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = snapshot.totalBytes === 0 ? 0 : Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setUploadProgress(prog)
            },
            (err) => { setUploading(false); console.log("ERR", err) },
            () => {
                setUploading(false)
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setEvent((prevState: any) => ({ ...prevState, "photo": url }))
                });
            }
        );
    }

    const handleSubmit = async () => {
        setLoading(true)
        const { status, message } = await validateCreateEvent(event)
        if (!status) {
            setLoading(false)
            toast.error("Error creating event", {
                description: message,
            })
            return
        }
        const createdEvent: IEvent = await createEventAction({ group: group._id, ...event })
        setLoading(false)
        if (event) {
            toast.success("Event created successfully")
            return router.push(`/space/${group?._id}/events/${createdEvent._id}`)
        } else {
            toast.error("Event not created. Something wrong happened.")
        }
    }

    return (
        <div className="container flex flex-col lg:flex-row gap-x-5">
            <div className="w-full lg:w-1/4 shrink-0">
                <div className="w-full aspect-square rounded-md relative">
                    <input
                        type="file"
                        id="file"
                        accept=".jpg, .png, .heif,"
                        className="hidden"
                        ref={fileInputRef}
                        multiple
                        onChange={handleUpload} />
                    {
                        event?.photo ?
                            <div className="border rounded-md w-full h-full relative">
                                <Image src={event?.photo as string} className="w-full h-full rounded-md object-contain shadow-lg" width={300} height={300} alt={`${event?.name}`} />
                                <div className="w-full absolute top-0 -left-5">
                                    <div className="flex p-1">
                                        <Button className="bg-white rounded-full" variant={"ghost"} size="icon" onClick={() => { setEvent(prevState => ({ ...prevState, photo: null })) }}>
                                            <Trash2Icon className="w-4 h-4 text-red-400" />
                                            <span className="sr-only">Remove</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="absolute w-full h-full flex justify-center items-center bg-gray-100 rounded-md" onClick={() => { fileInputRef.current.click() }}>
                                {
                                    uploading ?
                                        <CardDescription className="text-background">Uploading...</CardDescription>
                                        :
                                        <div className="p-3 rounded-full bg-secondary shadow-md">
                                            <Upload size={40} />
                                        </div>
                                }
                            </div>
                    }
                </div>
            </div>
            <div className="w-full">
                <div className="w-3/4 flex flex-col gap-y-5 mb-10">
                    <div className="flex flex-col mt-5 lg:mt-0 gap-y-3">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input
                            name="name"
                            placeholder="Event name"
                            autoComplete="false"
                            onChange={(e) => { setEvent(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                        />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <Label htmlFor="name">
                            Description
                        </Label>
                        <Textarea
                            name="description"
                            placeholder="Event description"
                            autoComplete="false"
                            rows={5}
                            onChange={(e) => { setEvent(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                        />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <Label htmlFor="description">Date <span className="text-xs"></span></Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !event?.date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {event?.date ? format(event.date, "PPP") : <span>Event date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Calendar
                                    mode="single"
                                    selected={event?.date}
                                    onSelect={(e) => { setEvent((prevState: IEvent) => ({ ...(prevState), "date": e })) }}
                                    initialFocus
                                    disabled={[{ before: new Date() }]}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <Label htmlFor="name">
                            Time
                        </Label>
                        <div className="flex gap-x-3 items-center">
                            <Input
                                name="start"
                                type="time"
                                placeholder="Event start time"
                                autoComplete="false"
                                onChange={(e) => { setEvent(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                            />
                            <div>to</div>
                            <Input
                                name="end"
                                type="time"
                                placeholder="Event End tome"
                                autoComplete="false"
                                onChange={(e) => { setEvent(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}
                            />

                        </div>
                    </div>
                    <div className="flex flex-col gap-y-3 w-full">
                        <Label htmlFor="">
                            Location
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
                                        borderColor: '#669972',
                                        '&:hover': {
                                            // Set border color on hover
                                        },
                                        boxShadow: '#c8dacc', // Add focus ring when focused
                                    }),
                                    input: (provided) => ({
                                        ...provided,
                                        color: 'foreground',
                                        borderColor: '#c8dacc',
                                        borderRadius: 16
                                    }),
                                    option: (provided) => ({
                                        ...provided,
                                        backgroundColor: provided.isSelected ? "#c8dacc" : "",
                                        '&:hover': {
                                            backgroundColor: '#c8dacc',
                                        },
                                        '&:active': {
                                            backgroundColor: '#c8dacc',
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
                    <div className="flex flex-col gap-y-3">
                        <Label htmlFor="name">
                            Tree cost
                        </Label>
                        <Input
                            name="price"
                            type="number"
                            placeholder="Price per tree"
                            autoComplete="false"
                            defaultValue={100}
                            min={100}
                            onChange={(e) => { setEvent(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}

                        />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <Label htmlFor="name">
                            Target <span className="text-xs">(optional)</span>
                        </Label>
                        <Input
                            name="target"
                            type="number"
                            placeholder="How much are you hoping to raise (optional)"
                            autoComplete="false"
                            onChange={(e) => { setEvent(prevState => ({ ...prevState, [e.target.name]: e.target.value })) }}

                        />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <Label htmlFor="name">
                            Capacity <span className="text-xs">(optional)</span>
                        </Label>
                        <Input name="price" type="number" placeholder="Max people to accept (optional)" autoComplete="false" />
                    </div>
                    <Button onClick={handleSubmit} disabled={loading}>
                        Create event
                    </Button>
                </div>
            </div>
        </div>
    )
}