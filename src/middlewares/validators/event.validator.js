const Joi = require('joi');
const { ResponseError } = require('../../errors');

const eventValidator = {
  getEventImageById: (req, res, next) => {
    try {
      const schema = Joi.object({
        imageName: Joi.string().required(),
      });

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

  getByEventId: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
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

  createEvent: (req, res, next) => {
    try {
      const schemaBody = Joi.object({
        title: Joi.string().required(),
        userId: Joi.string().guid().required(),
        city: Joi.string().required(),
        address: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(1).required(),
        stock: Joi.number().integer().min(1).required(),
        startAt: Joi.date().timestamp().required(),
      });

      const resultBody = schemaBody.validate(req.body);
      if (resultBody.error)
        throw new ResponseError(
          resultBody.error?.message || resultBody.error,
          400
        );

      const schemaFile = Joi.required().label('eventImage');
      const resultFile = schemaFile.validate(req.file);
      if (resultFile.error)
        throw new ResponseError(
          resultFile.error?.message || resultBody.error,
          400
        );

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  deleteEventById: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
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

  editEvent: (req, res, next) => {
    try {
      const schemaParams = Joi.object({
        id: Joi.number().integer().min(1).required(),
      }).required();

      const resultParams = schemaParams.validate(req.params);
      if (resultParams.error)
        throw new ResponseError(
          resultParams.error?.message || resultParams.error,
          400
        );

      const schemaBody = Joi.object({
        title: Joi.string().optional(),
        userId: Joi.string().guid().optional(),
        city: Joi.string().optional(),
        address: Joi.string().optional(),
        description: Joi.string().optional(),
        price: Joi.number().min(1).optional(),
        stock: Joi.number().min(1).optional(),
        startAt: Joi.date().timestamp().optional,
      }).required();

      const resultBody = schemaBody.validate(req.body);
      if (resultBody.error)
        throw new ResponseError(
          resultBody.error?.message || resultBody.error,
          400
        );

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },
};

module.exports = eventValidator;
