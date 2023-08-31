const router = require('express').Router();
const { orderController } = require('../controllers');

router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);

module.exports = router;
