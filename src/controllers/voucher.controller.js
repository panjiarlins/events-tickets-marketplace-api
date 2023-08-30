const { Voucher, Event } = require('../models');

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
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },

  getAllVouchersByEventId: async (req, res) => {
    try {
      const eventData = await Event.findByPk(req.params.eventId);
      if (!eventData) {
        res.status(404).json({
          status: 'error',
          message: 'event not found',
        });
        return;
      }

      const result = await eventData.getVouchers();
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

  createVoucher: async (req, res) => {
    try {
      const [result, isCreated] = await Voucher.findOrCreate({
        where: {
          eventId: req.body.eventId,
          code: req.body.code,
        },
        defaults: req.body,
      });
      if (!isCreated) {
        res.status(400).json({
          status: 'error',
          message: 'voucher code already exist in this eventId',
        });
        return;
      }
      res.status(201).json({
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

module.exports = voucherController;
