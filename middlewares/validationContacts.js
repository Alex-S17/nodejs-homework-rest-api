const Joi = require("joi");

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required(),
      phone: Joi.string().min(5).max(15).required(),
      favorite: Joi.boolean().optional(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        status: "400",
        message: validationResult.error.details,
      });
    }
    next();
  },

  updateContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(20).optional(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .optional(),
      phone: Joi.string().min(5).max(15).optional(),
      favorite: Joi.boolean().optional(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        status: "400",
        message: validationResult.error.details,
      });
    }
    next();
  },

  updateFavoriteValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().optional(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        status: "400",
        message: validationResult.error.details,
      });
    }
    next();
  },
};
