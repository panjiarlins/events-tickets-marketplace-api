const Joi = require('joi');
const { ResponseError } = require('../../errors');

const voucherValidator = {
  getAllVouchersByEventId: (req, res, next) => {
    try {
      const schema = Joi.object({
        eventId: Joi.number().integer().min(1).required(),
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

  createVoucher: (req, res, next) => {
    try {
      const schema = Joi.object({
        code: Joi.string().required(),
        point: Joi.number().min(1).required(),
        stock: Joi.number().integer().min(1).required(),
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
};

module.exports = voucherValidator;
