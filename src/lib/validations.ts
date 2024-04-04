const Joi = require('joi');
import { IEvent, IPhotoSpace } from "@/lib/types";

export const validateCreatePhotoSpace = async (data: IPhotoSpace) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        description: Joi.string().optional().allow(''),
        target: Joi.number().optional(),
        deadline: Joi.date().optional(),
        access: Joi.boolean()
            .required(),
        uploads: Joi.array().items(
            Joi.string()
        ),
    })
    try {
        const value = await schema.validateAsync(data);
        return { status: true }
    }
    catch (err: any) {
        return { status: false, message: err.details[0].message }
    }
}

export const validateEmail = async (email: string) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: false }),
    })
    try {
        const value = await schema.validateAsync({ email });
        return { status: true }
    }
    catch (err: any) {
        return { status: false, message: err.details[0].message }
    }
}

export const validateCreateEvent = async (data: IEvent) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
        description: Joi.string().required(),
        photo: Joi.string().required(),
        date: Joi.date().required(),
        start: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        end: Joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/).required(),
        location: Joi.object({
            latitude: Joi.number(),
            longitude: Joi.number(),
            location: Joi.string()
        }).required(),
        price: Joi.number().optional().min(50),
        target: Joi.number().optional(),
    })
    try {
        const value = await schema.validateAsync(data);
        return { status: true }
    }
    catch (err: any) {
        return { status: false, message: err.details[0].message }
    }
}
