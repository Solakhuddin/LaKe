import Joi  from 'joi';

const searchMonthValidation =  Joi.object({
    created_at: Joi.date().required()
});


export {
  searchMonthValidation,
};