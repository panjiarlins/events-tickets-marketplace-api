const { Voucher } = require('../models');

const voucherController = {
  getAllVouchers: async (req, res) => {
    try {
      const result = await Voucher.findAll();
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

  getVoucherByEventId: async (req, res) => {
    try {
      const result = await Voucher.findByPk(req.params.eventId);
      if (!result) {
        res.status(404).json({
          status: 'error',
          message: 'review not found',
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

  createVoucher: async (req, res) => {
    try {
      const {
        eventId, code, point, stock,
      } = await Voucher.create({ ...req.body });
      res.status(201).json({
        status: 'success',
        data: {
          eventId, code, point, stock,
        },
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
