const { Order, Event, Review } = require('../models');

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const result = await Order.findAll({
        include: [
          { model: Event },
          { model: Review },
        ],
      });
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

  getOrderById: async (req, res) => {
    try {
      const result = await Order.findByPk(req.params.id, {
        include: [
          { model: Event },
          { model: Review },
        ],
      });
      if (!result) {
        res.status(404).json({
          status: 'error',
          message: 'order not found',
        });
        return;
      }
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
};

module.exports = orderController;
