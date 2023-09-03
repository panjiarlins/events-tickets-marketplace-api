const router = require('express').Router();
const { orderController } = require('../controllers');
const { orderValidator } = require('../middlewares/validators');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderValidator.getOrderById, orderController.getOrderById);
router.post('/', orderValidator.createOrder, orderController.createOrder);
router.post(
  '/payment-email',
  orderValidator.sendPaymentEmail,
  orderController.sendPaymentEmail,
);
router.patch('/pay', orderValidator.payOrder, orderController.payOrder);

module.exports = router;
