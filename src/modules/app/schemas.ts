import Joi from '@hapi/joi';

export const newIssueSchema = Joi.object({
    date_day: Joi.number()
        .integer()
        .min(1)
        .max(31)
        .required(), 
    date_month: Joi.number()
        .integer()
        .min(1)
        .max(12)
        .required(), 
    date_year: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear() + 1)
        .required(), 
})

export const editIssueSchema = Joi.object({
    date_day: Joi.number()
        .integer()
        .min(1)
        .max(31)
        .required(), 
    date_month: Joi.number()
        .integer()
        .min(1)
        .max(12)
        .required(), 
    date_year: Joi.number()
        .integer()
        .min(1900)
        .max(new Date().getFullYear() + 1)
        .required(), 
})
