import Joi from "joi";

const registerUserVal = Joi.object({
  username: Joi.string().max(30).required(),
  password: Joi.string().max(20).required(),
  name: Joi.string().max(35).required()
});

const loginUserVal = Joi.object({
  username: Joi.string().max(30).required(),
  password: Joi.string().max(100).required()
});

const getUserVal = Joi.string().max(30).required();

const updateUserVal = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).optional(),
  name: Joi.string().max(100).optional()
})


export { 
  registerUserVal, 
  loginUserVal, 
  getUserVal ,
  updateUserVal
};