const Joi = require('joi');

const CreateSchema = Joi.object({
  id: Joi.forbidden(),
  name: Joi.string().trim().required(),
  url: Joi.string().uri().required(),
  image: Joi.string().dataUri().allow(null).allow('').default(null)
});

const UpdateSchema = Joi.object({
  id: Joi.forbidden(),
  name: Joi.string().trim(),
  url: Joi.string().uri(),
  image: Joi.string().dataUri()
});

module.exports = {
  SiteCreateSchema: CreateSchema,
  SiteUpdateSchema: UpdateSchema
};
