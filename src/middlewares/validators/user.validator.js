const Joi = require('joi');

const userValidator = {
  getUserById: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().guid().required(),
      }).required();

      const result = schema.validate(req.params);
      if (result.error) throw { code: 400, message: result.error.message };

      next();
    } catch (error) {
      if (error.code && error.message) {
        res.status(error.code).json({
          status: 'error',
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        status: 'error',
        message: error,
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
      if (result.error) throw { code: 400, message: result.error.message };

      next();
    } catch (error) {
      if (error.code && error.message) {
        res.status(error.code).json({
          status: 'error',
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },

  deleteUserById: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().guid().required(),
      }).required();

      const result = schema.validate(req.params);
      if (result.error) throw { code: 400, message: result.error.message };

      next();
    } catch (error) {
      if (error.code && error.message) {
        res.status(error.code).json({
          status: 'error',
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },
};

module.exports = userValidator;
