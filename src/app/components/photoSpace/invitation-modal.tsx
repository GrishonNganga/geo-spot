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
import { Label } from "@/components/ui/label"
import { getPopulatedInvitations, updatePhotoSpaceAction } from "@/lib/actions"
import { IPhotoSpace } from "@/lib/types"
import { cn } from "@/lib/utils"
import { validateEmail } from "@/lib/validations"
import React, { KeyboardEventHandler } from 'react';

import CreatableSelect from 'react-select/creatable';
import { toast } from "sonner"

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

export default function InvitationModal({ photoSpace, open, setOpen, setInvitations }: { open: boolean, setOpen: () => void, photoSpace?: IPhotoSpace, setInvitations: (emails: String[]) => void }) {
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = React.useState<Option[]>([]);

    const handleChange = (val: any) => {
        setValue(val);
    }

    const handleInput = async (handleInput: string) => {
        if (!inputValue) return
        const { status, message } = await validateEmail(inputValue)
        if (!status) {
            toast.error("", {
                description: message,
            })
            return
        }
        const exists = value.find(op => op.value === inputValue)
        if (exists) {
            toast.error("", {
                description: "Email already added",
            })
            return
        }
        setValue(prevState => [...prevState, createOption(inputValue)])
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const emails = value.map(v => v.value)
        if (emails.length == 0) {
            toast.error("", {
                description: "Emails not provided",
            })
            return
        }
        if (!photoSpace) {
            return
        }
        const updatedPhotoSpace = await updatePhotoSpaceAction(photoSpace._id!, { invitations: emails })
        if (updatedPhotoSpace) {
            const inv = await getPopulatedInvitations(updatedPhotoSpace.invitations)
            setInvitations(inv)
            setValue([])
            toast.success("", {
                description: "User invited successfully"
            })
            setTimeout(() => {
                setOpen()
            }, 1000)
        } else {
            toast.error("User not invited", {
                description: updatedPhotoSpace.message
            })
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Invite Collaborators</DialogTitle>
                    <DialogDescription>
                        Invite friends to add photos to your photospace
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-y-4">
                        <div className=" gap-x-2 items-center">
                            <Label htmlFor="name" className="text-right">
                                Emails
                            </Label>
                            <CreatableSelect
                                className={cn("w-full placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50")}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 16,
                                    colors: {
                                        ...theme.colors,
                                        primary25: 'hotpink',
                                        primary: 'hotpink',
                                    },
                                })} components={components}
                                inputValue={inputValue}
                                isClearable
                                isMulti
                                menuIsOpen={false}
                                onChange={handleChange}
                                onBlur={() => handleInput(inputValue)}
                                onInputChange={(newValue) => setInputValue(newValue)}
                                onKeyDown={handleKeyDown}
                                placeholder="Add Emails..."
                                value={value}
                            />
                        </div>
                    </div>
                    <DialogFooter className="mt-5">
                        <Button type="submit">Invite</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
