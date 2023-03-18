const Joi = require("joi");

module.exports = {
  userValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .required(),
      password: Joi.string().min(5).max(20).required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        status: "400 Bad Request",
        ResponseBody: "Ошибка от Joi или другой библиотеки валидации",
        // message: validationResult.error.details,
      });
    }
    next();
  },
};
