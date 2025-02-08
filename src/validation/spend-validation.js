import Joi from "joi";

const createSpendValidation = Joi.object({
    username: Joi.string().max(100).required(),
    amount: Joi.number().precision(3).max(100000000).required().strict(),
    category: Joi.string().max(20).optional(),
    description: Joi.string().max(200).optional(),
});

const getSpendValidation = Joi.number().positive().required();

const updateSpendValidation = Joi.object({
    id: Joi.number().positive().required(),
    category: Joi.string().max(20).optional(),
    description: Joi.string().max(200).optional(),
    updated_at: Joi.date().optional(),
});

const searchSpendValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    category: Joi.string().optional(),
    description: Joi.string().optional(),
    created_at: Joi.date().optional()
})

export {
    createSpendValidation,
    getSpendValidation,
    updateSpendValidation,
    searchSpendValidation
}
