const Joi = require("joi");

const employeschema = {
  register: {
    body: Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    }),
  },
};

module.exports = employeschema;
