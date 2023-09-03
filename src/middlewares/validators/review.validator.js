const Joi = require('joi');
const { ResponseError } = require('../../errors');

const reviewValidator = {
  getReviewByOrderId: (req, res, next) => {
    try {
      const schema = Joi.object({
        orderId: Joi.number().integer().min(1).required(),
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

  createReview: (req, res, next) => {
    try {
      const schema = Joi.object({
        orderId: Joi.number().integer().min(1).required(),
        comment: Joi.string().required(),
        rating: Joi.number().min(0).required(),
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

  deleteReviewByOrderId: (req, res, next) => {
    try {
      const schema = Joi.object({
        orderId: Joi.number().integer().min(1).required(),
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

module.exports = reviewValidator;
