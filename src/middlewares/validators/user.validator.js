const Joi = require('joi');
const { ResponseError } = require('../../errors');

const userValidator = {
  getUserById: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().guid().required(),
      }).required();

      const result = schema.validate(req.params);
      if (result.error)
        throw new ResponseError(result.error?.message || result.error, 400);

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
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
      if (result.error)
        throw new ResponseError(result.error?.message || result.error, 400);

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  registerUser: (req, res, next) => {
    try {
      // validate req.body
      const schemaBody = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        referrerCode: Joi.string().optional(),
      }).required();

      const resultBody = schemaBody.validate(req.body);
      if (resultBody.error)
        throw new ResponseError(
          resultBody.error?.message || resultBody.error,
          400,
        );

      // validate req.file
      const schemaFile = Joi.optional().label('profileImage');

      const resultFile = schemaFile.validate(req.file);
      if (resultFile.error)
        throw new ResponseError(
          resultFile.error?.message || resultFile.error,
          400,
        );

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  getUserProfileImageByUserId: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().guid().required(),
      }).required();

      const result = schema.validate(req.params);
      if (result.error)
        throw new ResponseError(result.error?.message || result.error, 400);

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  deleteUserById: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string().guid().required(),
      }).required();

      const result = schema.validate(req.params);
      if (result.error)
        throw new ResponseError(result.error?.message || result.error, 400);

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },
};

module.exports = userValidator;
