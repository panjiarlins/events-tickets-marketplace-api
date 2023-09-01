const router = require('express').Router();
const { orderController } = require('../controllers');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.patch('/pay/:id', orderController.payOrder);

module.exports = router;
