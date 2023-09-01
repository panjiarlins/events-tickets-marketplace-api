const {
  Sequelize, sequelize, Order, User, Event, Review, Voucher,
} = require('../models');

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const result = await Order.findAll({
        include: [
          { model: Event },
          { model: Review },
          { model: Voucher },
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
          { model: Voucher },
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

  createOrder: async (req, res) => {
    try {
      await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      }, async (t) => {
        const {
          userId, eventId, voucherCode, quantity,
        } = req.body;

        const userData = await User.findByPk(userId, { transaction: t });
        if (!userData) throw { code: 404, message: 'user not found' };

        const eventData = await Event.findByPk(eventId, { transaction: t });
        if (!eventData) throw { code: 404, message: 'event not found' };

        if (eventData.stock - quantity < 0) throw { code: 400, message: 'stock not enough' };
        await eventData.increment({ stock: -(quantity) }, { transaction: t });

        if (voucherCode) {
          const isVoucherValid = await eventData.hasVoucher(voucherCode, { transaction: t });
          const voucherData = await Voucher.findByPk(voucherCode, { transaction: t });
          if (!isVoucherValid || !voucherData) throw { code: 400, message: 'voucherCode invalid' };
          await voucherData.increment({ stock: -1 }, { transaction: t });
        }

        const result = await Order.create(req.body, {
          fields: ['userId', 'eventId', 'quantity', 'voucherCode', 'referralPointUsage'],
          transaction: t,
        });

        res.status(201).json({
          status: 'success',
          data: result,
        });
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
};

module.exports = orderController;
