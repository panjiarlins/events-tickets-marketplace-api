const router = require('express').Router();
const { orderController } = require('../controllers');
const { orderValidator } = require('../middlewares/validators');

// GET all orders
router.get('/', orderController.getAllOrders);

// GET order by orderId
router.get('/:id', orderValidator.getOrderById, orderController.getOrderById);

// POST new order
router.post('/', orderValidator.createOrder, orderController.createOrder);

// POST send payment email by orderId
router.post(
  '/payment-email/:id',
  orderValidator.sendPaymentEmail,
  orderController.sendPaymentEmail
);

// PATCH pay order by orderId
router.patch('/pay/:id', orderValidator.payOrder, orderController.payOrder);

module.exports = router;
