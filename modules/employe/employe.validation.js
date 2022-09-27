const Joi = require("joi");

const schema = {
  register: {
    body: Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    }),
    // query: Joi.object({
    //   name: Joi.string().alphanum().min(3).max(30).required(),
    //   email: Joi.string().email({
    //     minDomainSegments: 2,
    //     tlds: { allow: ["com", "net"] },
    //   }),
    //   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    // }),
  },
};

module.exports = schema;
