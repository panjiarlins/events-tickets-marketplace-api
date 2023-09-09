const jwt = require('jsonwebtoken');
const { ResponseError } = require('../../errors');
const { Order } = require('../../models');

const reviewAuth = {
  authCreateReview: async (req, res, next) => {
    try {
      const orderData = await Order.findByPk(req.body.orderId, {
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

  authReviewByOrderIdParams: async (req, res, next) => {
    try {
      const orderData = await Order.findByPk(req.params.orderId, {
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

module.exports = reviewAuth;
