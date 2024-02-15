const Joi = require('joi');
import { IPhotoSpace } from "@/lib/types";

export const validateCreatePhotoSpace = async (data: IPhotoSpace) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),
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