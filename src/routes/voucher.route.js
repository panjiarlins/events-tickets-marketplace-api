const router = require('express').Router();
const { voucherController } = require('../controllers');

router.get('/', voucherController.getAllVouchers);
router.get('/:eventId', voucherController.getVoucherByEventId);
router.post('/', voucherController.createVoucher);

module.exports = router;
