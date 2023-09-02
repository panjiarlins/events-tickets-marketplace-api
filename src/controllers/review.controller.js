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
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },

  getReviewByOrderId: async (req, res) => {
    try {
      const result = await Review.findByPk(req.params.orderId, { include: [{ model: Order }] });
      if (!result) throw { code: 404, message: 'review not found' };

      res.status(200).json({
        status: 'success',
        data: result,
      });
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

  createReview: async (req, res) => {
    try {
      const [result, isCreated] = await Review.findOrCreate({
        where: { orderId: req.body.orderId },
        defaults: req.body,
        fields: ['orderId', 'comment', 'rating'],
      });
      if (!isCreated) throw { code: 400, message: 'review for this orderId already exist' };

      res.status(201).json({
        status: 'success',
        data: result,
      });
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

  deleteReviewByOrderId: async (req, res) => {
    try {
      const result = await Review.destroy({ where: { orderId: req.params.orderId } });
      if (!result) throw { code: 404, message: 'user not found' };

      res.sendStatus(204);
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

module.exports = reviewController;
