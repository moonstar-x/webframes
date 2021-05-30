const { InvalidBodyError } = require('../errors');

const validateWithSchema = (obj, Schema) => {
  const { error: validationError, value: validatedData } = Schema.validate(obj, { convert: false });

  if (validationError) {
    throw new InvalidBodyError(validationError.message);
  }

  return validatedData;
};

module.exports = {
  validateWithSchema
};
