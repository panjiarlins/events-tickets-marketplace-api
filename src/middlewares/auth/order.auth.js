const jwt = require('jsonwebtoken');
const { ResponseError } = require('../../errors');
const { Order } = require('../../models');

const orderAuth = {
  authCreateOrder: (req, res, next) => {
    try {
      jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) throw new ResponseError(err, 401);
        if (decoded?.id !== req.body.userId)
          throw new ResponseError('unauthorized', 401);
      });

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  authOrderByIdParams: async (req, res, next) => {
    try {
      const orderData = await Order.findByPk(req.params.id, {
        attributes: ['userId'],
      });
      if (!orderData) throw new ResponseError('order not found', 404);

      jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) throw new ResponseError(err, 401);
        if (decoded?.id !== orderData.userId)
          throw new ResponseError('unauthorized', 401);
      });

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },
};

module.exports = orderAuth;
