const Joi = require('joi');
const { ResponseError } = require('../../errors');

const userValidator = {
  getUserById: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().guid().required(),
      }).required();

      const result = schema.validate(req.params);
      if (result.error) throw new ResponseError(result.error.message, 400);

      next();
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  loginUser: (req, res, next) => {
    try {
      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      }).required();

      const result = schema.validate(req.body);
      if (result.error) throw new ResponseError(result.error.message, 400);

      next();
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  registerUser: (req, res, next) => {
    try {
      const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        referrerCode: Joi.string().optional(),
      }).required();

      const result = schema.validate(req.body);
      if (result.error) throw new ResponseError(result.error.message, 400);

      next();
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  deleteUserById: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().guid().required(),
      }).required();

      const result = schema.validate(req.params);
      if (result.error) throw new ResponseError(result.error.message, 400);

      next();
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  },
};

module.exports = userValidator;
