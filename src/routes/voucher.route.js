const router = require('express').Router();
const { voucherValidator } = require('../middlewares/validators');
const { voucherAuth } = require('../middlewares/auth');
const { voucherController } = require('../controllers');

// GET all vouchers
router.get('/', voucherController.getAllVouchers);

// GET vouchers by eventId
router.get(
  '/:eventId',
  voucherValidator.getAllVouchersByEventId,
  voucherController.getAllVouchersByEventId
);

// POST new voucher
router.post(
  '/',
  voucherValidator.createVoucher,
  voucherAuth.authCreateVoucher,
  voucherController.createVoucher
);

module.exports = router;
