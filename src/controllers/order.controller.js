const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const mailer = require('../lib/nodemailer');
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
      if (!result) throw { code: 404, message: 'order not found' };

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

  createOrder: async (req, res) => {
    try {
      await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      }, async (t) => {
        const {
          userId, eventId, voucherCode, quantity,
        } = req.body;

        // check user
        const userData = await User.findByPk(userId, { transaction: t });
        if (!userData) throw { code: 404, message: 'user not found' };

        // check event
        const eventData = await Event.findByPk(eventId, { transaction: t });
        if (!eventData) throw { code: 404, message: 'event not found' };

        // check event stock
        if (eventData.stock - quantity < 0) throw { code: 400, message: 'event stock not enough' };
        await eventData.increment({ stock: -(quantity) }, { transaction: t });

        let totalPayment = eventData.price * quantity;
        if (voucherCode) {
          // check voucher
          const isVoucherValid = await eventData.hasVoucher(voucherCode, { transaction: t });
          const voucherData = await Voucher.findByPk(voucherCode, { transaction: t });
          if (!isVoucherValid || !voucherData) throw { code: 400, message: 'voucherCode invalid' };

          // check voucher stock
          if (voucherData.stock - 1 < 0) throw { code: 400, message: 'voucher out of stock' };
          await voucherData.increment({ stock: -1 }, { transaction: t });
          totalPayment = Math.max(totalPayment - voucherData.point, 0);
        }

        let referralPointUsage = 0;
        const referralData = await userData.getReferral({ transaction: t });
        if (referralData.point > 0 && totalPayment > 0) {
          // referral point usage
          totalPayment = Math.max(totalPayment - referralData.point, 0);
          referralPointUsage = Math.min(totalPayment, referralData.point);
          await referralData.increment({ point: -(referralPointUsage) }, { transaction: t });
        }

        // create order
        const orderData = await Order.create(
          {
            ...req.body,
            referralPointUsage,
          },
          {
            fields: ['userId', 'eventId', 'quantity', 'voucherCode', 'referralPointUsage'],
            transaction: t,
          },
        );

        res.status(201).json({
          status: 'success',
          data: {
            ...orderData.toJSON(),
            totalPayment,
          },
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

  payOrder: async (req, res) => {
    try {
      const [orderData] = await Order.update({ isPaid: true }, { where: { id: req.params.id } });
      console.log(orderData);
      if (orderData === 0) throw { code: 404, message: 'order not found' };

      res.status(200).json({
        status: 'success',
        data: orderData,
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

  sendPaymentEmail: async (req, res) => {
    try {
      const orderData = await Order.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ['firstName', 'email'],
          },
          { model: Event },
          { model: Voucher },
        ],
      });
      if (!orderData) throw { code: 404, message: 'order not found' };
      if (orderData.isPaid) throw { code: 400, message: 'order already paid' };

      const totalPayment = orderData.Event.price
        * orderData.quantity
        - orderData.referralPointUsage
        - (orderData.Voucher?.point || 0);

      const template = fs
        .readFileSync(path.resolve(__dirname, '..', 'templates', 'paymentEmail.html'))
        .toString();

      const rendered = mustache.render(template, {
        firstName: orderData.User.firstName,
        totalPayment: totalPayment.toLocaleString('id-ID'),
        paymentLink: `${process.env.WEBSITE}/pay/${orderData.id}`,
      });

      mailer({
        to: process.env.NODEMAILER_EMAIL,
        // to: orderData.User.email,
        html: rendered,
        text: rendered,
        subject: 'Payment Gateway Notification',
      });

      res.status(200).json({
        status: 'success',
        message: 'payment email has been sent',
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
