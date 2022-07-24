import { Request } from "express"

const validateParamFields = (fields: Array<String>, req: Request): Array<String> => {
    let errors: Array<String> = []
    fields.forEach((field) => {
        if (req.params[`${field}`]) {
            return
        }
        errors.push(`please provide ${field} field inside url`)
    })
    return errors
}

const validateBodyFields = (fields: Array<String>, req: Request): Array<String> => {
    let errors: Array<String> = []
    fields.forEach((field) => {
        if (req.body[`${field}`]) {
            return
        }
        errors.push(`please provide ${field} field inside body`)
    })
    return errors
}

export {
    validateParamFields,
    validateBodyFields
}