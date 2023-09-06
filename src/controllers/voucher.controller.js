const { ResponseError } = require('../errors');
const { Sequelize, sequelize, Voucher, Event } = require('../models');

const voucherController = {
  getAllVouchers: async (req, res) => {
    try {
      const result = await Voucher.findAll({
        include: [{ model: Event }],
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

  getAllVouchersByEventId: async (req, res) => {
    try {
      const eventData = await Event.findByPk(req.params.eventId);
      if (!eventData) throw new ResponseError('event not found', 404);

      const result = await eventData.getVouchers();

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

  createVoucher: async (req, res) => {
    try {
      await sequelize.transaction(
        {
          isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        },
        async (t) => {
          const eventData = await Event.findByPk(req.body.eventId, {
            transaction: t,
          });
          if (!eventData) throw new ResponseError('event not found', 404);

          const [voucherData, isCreated] = await Voucher.findOrCreate({
            where: { code: req.body.code },
            defaults: req.body,
            transaction: t,
          });
          if (!isCreated)
            throw new ResponseError('voucher code already exist', 400);

          await eventData.addVoucher(voucherData, { transaction: t });

          res.status(201).json({
            status: 'success',
            data: voucherData,
          });
        },
      );
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },
};

module.exports = voucherController;
