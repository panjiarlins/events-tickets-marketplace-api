const router = require('express').Router();
const { voucherController } = require('../controllers');
const { voucherValidator } = require('../middlewares/validators');

router.get('/', voucherController.getAllVouchers);
router.get(
  '/:eventId',
  voucherValidator.getAllVouchersByEventId,
  voucherController.getAllVouchersByEventId,
);
router.post(
  '/',
  voucherValidator.createVoucher,
  voucherController.createVoucher,
);

module.exports = router;
