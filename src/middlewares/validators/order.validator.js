const Joi = require('joi');
const { ResponseError } = require('../../errors');

const orderValidator = {
  getOrderById: (req, res, next) => {
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

  createOrder: (req, res, next) => {
    try {
      const schema = Joi.object({
        userId: Joi.string().guid().required(),
        eventId: Joi.number().integer().min(1).required(),
        quantity: Joi.number().integer().min(1).required(),
        voucherCode: Joi.string().optional(),
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

  payOrder: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
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

  sendPaymentEmail: (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.number().integer().min(1).required(),
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
};

module.exports = orderValidator;
