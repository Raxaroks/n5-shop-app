import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  NODE_ENV: Joi.required(),
  PORT: Joi.number().default(3000),
  MONGODB_URL: Joi.string(),
  MONGODB_PRODUCTS_COLLECTION: Joi.string()
});