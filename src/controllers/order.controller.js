const fs = require('fs');
const path = require('path');
const mustache = require('mustache');
const { ResponseError } = require('../errors');
const { mailer } = require('../libs');
const {
  Sequelize,
  sequelize,
  Order,
  User,
  Event,
  Review,
  Voucher,
} = require('../models');

const orderController = {
  getAllOrders: async (req, res) => {
    try {
      const result = await Order.findAll({
        include: [{ model: Event }, { model: Review }, { model: Voucher }],
      });

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const result = await Order.findByPk(req.params.id, {
        include: [{ model: Event }, { model: Review }, { model: Voucher }],
      });
      if (!result) throw new ResponseError('order not found', 404);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  createOrder: async (req, res) => {
    try {
      await sequelize.transaction(
        {
          isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        },
        async (t) => {
          const { userId, eventId, voucherCode, quantity } = req.body;

          // check user
          const userData = await User.findByPk(userId, { transaction: t });
          if (!userData) throw new ResponseError('user not found', 404);

          // check event
          const eventData = await Event.findByPk(eventId, { transaction: t });
          if (!eventData) throw new ResponseError('event not found', 404);

          // check event stock
          if (eventData.stock - quantity < 0)
            throw new ResponseError('event stock not enough', 400);
          await eventData.increment({ stock: -quantity }, { transaction: t });

          let totalPayment = eventData.price * quantity;
          if (voucherCode) {
            // check voucher
            const isVoucherValid = await eventData.hasVoucher(voucherCode, {
              transaction: t,
            });
            const voucherData = await Voucher.findByPk(voucherCode, {
              transaction: t,
            });
            if (!isVoucherValid || !voucherData)
              throw new ResponseError('voucherCode invalid', 400);

            // check voucher stock
            if (voucherData.stock - 1 < 0)
              throw new ResponseError('voucher out of stock', 400);

            await voucherData.increment({ stock: -1 }, { transaction: t });
            totalPayment = Math.max(totalPayment - voucherData.point, 0);
          }

          let referralPointUsage = 0;
          const referralData = await userData.getReferral({ transaction: t });
          if (referralData.point > 0 && totalPayment > 0) {
            // referral point usage
            referralPointUsage = Math.min(totalPayment, referralData.point);
            await referralData.increment(
              { point: -referralPointUsage },
              { transaction: t }
            );
            totalPayment -= referralPointUsage;
          }

          // create order
          const orderData = await Order.create(
            {
              ...req.body,
              isPaid: totalPayment <= 0,
              referralPointUsage,
            },
            {
              fields: [
                'userId',
                'eventId',
                'quantity',
                'voucherCode',
                'referralPointUsage',
                'isPaid',
              ],
              transaction: t,
            }
          );

          res.status(201).json({
            status: 'success',
            data: {
              ...orderData.toJSON(),
              totalPayment,
            },
          });
        }
      );
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  payOrder: async (req, res) => {
    try {
      const [orderData] = await Order.update(
        { isPaid: true },
        { where: { id: req.params.id } }
      );
      if (orderData === 0) throw new ResponseError('order not found', 404);

      res.sendStatus(204);
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
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
      if (!orderData) throw new ResponseError('order not found', 404);
      if (orderData.isPaid) throw new ResponseError('order already paid', 400);

      const totalPayment =
        orderData.Event.price * orderData.quantity -
        orderData.referralPointUsage -
        (orderData.Voucher?.point || 0);

      const template = fs
        .readFileSync(
          path.resolve(__dirname, '..', 'templates', 'paymentEmail.html')
        )
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
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },
};

module.exports = orderController;
