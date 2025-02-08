import { ResponseError } from "../error/response-error";

const validate = (schema, req) => {
  const result = schema.validate(req, {
    abortEarly: false,
    allowUnknown: false,
    convert: true
  })
  if (result.error){
    console.log(result.error.message);
    throw new ResponseError(400, result.error.message);
  } else {
    return result.value;
  }
}

export {
  validate,
};
