import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getLoggedInUser } from "@/lib/actions";
import { IEvent, IUser } from "@/lib/types";
import { validateUser } from "@/lib/validations";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PaymentModal({ open, setOpen, event, trees, amount }: { open: boolean, setOpen: () => void, event: IEvent, trees: number, amount: number }) {
    const [user, setUser] = useState<IUser>()
    const [userDetails, setUserDetails] = useState<IUser>()
    const [paymentLoading, setPaymentLoading] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            setUser(await getLoggedInUser())

        }
        getUser()
    }, [])

    function getAmount(number: number) {
        if ((number | 0) < number) {
            return Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'KES'
            }).format(number)
        }
        return Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'KES',
            maximumFractionDigits: 0
        }).format(number);
    }

    const getCheckoutLink = async () => {
        let customer
        if (!user && !userDetails) {
            toast.error("Please provide user details")
            return
        }
        if (userDetails) {
            const { status, message } = await validateUser(userDetails)
            if (!status) {
                toast.error(message)
                return
            }
            customer = userDetails
        } else {
            customer = user
        }
        setPaymentLoading(true)
        try {
            const response = await fetch("https://api.flutterwave.com/v3/payments",
                {
                    headers: {
                        'Content-Type': "application/json",
                        'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_BASE_URL!,
                        'Authorization': `Bearer ${process.env.FW_SECRET_KEY}`
                    },
                    method: "POST",
                    body: JSON.stringify({
                        tx_ref: `tx_ref_${new Date().toISOString()}`,
                        amount: "100",
                        currency: "NGN",
                        payment_options: 'card,mobilemoney',
                        redirect_url: "https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
                        // meta: {
                        //     consumer_id: 23,
                        //     consumer_mac: "92a3-912ba-1192a"
                        // },
                        customer: {
                            email: user!.email,
                            phonenumber: "0729400426",
                            name: user!.name
                        },
                        customizations: {
                            title: 'Arboretum plant trees',
                            description: 'Payment for items in cart',
                            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
                        },
                    })
                })
            setPaymentLoading(false)
            console.log("RES", response)
            const data = await response.json()
            console.log("D", data)
        } catch (e) {
            setPaymentLoading(false)
            return
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogOverlay className="bg-opacity-50">

            </DialogOverlay>
            <DialogContent className="max-w-full h-full overflow-y-scroll sm:rounded-none">
                <div className="lg:container mt-20 lg:mt-0 w-full lg:h-3/4 flex flex-col lg:justify-center lg:items-center lg:flex-row-reverse gap-x-10">
                    <div className="lg:w-1/3 flex flex-col border rounded-md">
                        <div className="flex gap-x-3 p-4">
                            <div className="flex aspect-square border rounded-md">
                                <Image placeholder="blur" blurDataURL="/loading-image.jpeg" src={event.photo as string} width={50} height={50} alt="Nice alt" className="w-full rounded-md" />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <CardTitle className="text-xl font-semibold">
                                    {event.name}
                                </CardTitle>
                                <div className="text-sm text-muted-foreground">
                                    {format(event!.date!.toDateString(), "LLLL	d, yyyy")} &nbsp; {event?.start?.toLocaleDateString()} - {event?.end?.toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between p-4 border-t">
                            <div className="text-muted-foreground text-sm">
                                Trees
                            </div>
                            <div className="font-semibold">
                                {trees}
                            </div>
                        </div>
                        <div className="border-t flex justify-between p-4">
                            <div className="text-muted-foreground text-sm">
                                Total
                            </div>
                            <CardTitle className="">
                                KES {getAmount(amount)}
                            </CardTitle>
                        </div>
                    </div>
                    <div className="lg:w-1/3 flex flex-col gap-y-5 mt-10 lg:mt-0">
                        <CardTitle>Your Info</CardTitle>
                        {
                            !user &&
                            <>
                                <div className="flex flex-col gap-y-3">
                                    <Label htmlFor="name">Name</Label>
                                    <Input type="name" name="name" onChange={(e) => { setUserDetails((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value })) }} autoComplete="false" placeholder="Your name" />
                                </div>
                                <div className="flex flex-col gap-y-3">
                                    <Label htmlFor="email">Email</Label>
                                    <Input type="name" name="email" onChange={(e) => { setUserDetails((prevState: any) => ({ ...prevState, [e.target.name]: e.target.value })) }} autoComplete="false" placeholder="Your email" />
                                </div>
                            </>
                            ||
                            <>
                                <div className="flex gap-x-3">
                                    <div>
                                        <Avatar>
                                            <AvatarImage src={user?.image as string} alt={`${user?.name} photo`} />
                                            <AvatarFallback>{user?.name?.split(" ")[0][0]}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                        <div className="capitalize font-semibold">
                                            {user?.name}
                                        </div>
                                        <div className="text-sm">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                        <Button className={"bg-[#ff9b00] hover:bg-[#ff9b00]/80"} onClick={getCheckoutLink} disabled={paymentLoading}>
                            Pay Now
                        </Button>
                    </div>

                </div>
            </DialogContent>

        </Dialog>
    )
}