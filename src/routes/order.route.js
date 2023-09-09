const router = require('express').Router();
const { orderValidator } = require('../middlewares/validators');
const { orderAuth } = require('../middlewares/auth');
const { orderController } = require('../controllers');

// GET all orders
router.get('/', orderController.getAllOrders);

// GET order by orderId
router.get(
  '/:id',
  orderValidator.getOrderById,
  orderAuth.authOrderByIdParams,
  orderController.getOrderById
);

// POST new order
router.post(
  '/',
  orderValidator.createOrder,
  orderAuth.authCreateOrder,
  orderController.createOrder
);

// POST send payment email by orderId
router.post(
  '/payment-email/:id',
  orderValidator.sendPaymentEmail,
  orderController.sendPaymentEmail
);

// PATCH pay order by orderId
router.patch('/pay/:id', orderValidator.payOrder, orderController.payOrder);

module.exports = router;
