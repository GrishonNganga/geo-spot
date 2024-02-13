const Joi = require('joi');
import { IUser, IPhotoSpace } from "@/lib/types";

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
