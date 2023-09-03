const { ResponseError } = require('../errors');
const { Review, Order } = require('../models');

const reviewController = {
  getAllReviews: async (req, res) => {
    try {
      const result = await Review.findAll({ include: [{ model: Order }] });

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  getReviewByOrderId: async (req, res) => {
    try {
      const result = await Review.findByPk(req.params.orderId, {
        include: [{ model: Order }],
      });
      if (!result) throw new ResponseError('review not found', 404);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  createReview: async (req, res) => {
    try {
      const [result, isCreated] = await Review.findOrCreate({
        where: { orderId: req.body.orderId },
        defaults: req.body,
        fields: ['orderId', 'comment', 'rating'],
      });
      if (!isCreated)
        throw new ResponseError('review for this orderId already exist', 400);

      res.status(201).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  },

  deleteReviewByOrderId: async (req, res) => {
    try {
      const result = await Review.destroy({
        where: { orderId: req.params.orderId },
      });
      if (!result) throw new ResponseError('review not found', 404);

      res.sendStatus(204);
    } catch (error) {
      res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
      });
    }
  },
};

module.exports = reviewController;
