import Joi from "joi";

const createIncomeValidation = Joi.object({
    username: Joi.string().max(100).required(),
    amount: Joi.number().precision(3).max(100000000).required().strict(),
    category: Joi.string().max(20).optional(),
    description: Joi.string().max(200).optional(),
});

const getIncomeValidation = Joi.number().positive().required();

const updateIncomeValidation = Joi.object({
    id: Joi.number().positive().required(),
    category: Joi.string().max(20).optional(),
    description: Joi.string().max(200).optional(),
    updated_at: Joi.date().optional(),
});

const searchIncomeValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    category: Joi.string().optional(),
    description: Joi.string().optional(),
    created_at: Joi.date().optional()
})

export {
    createIncomeValidation,
    getIncomeValidation,
    updateIncomeValidation,
    searchIncomeValidation
}
