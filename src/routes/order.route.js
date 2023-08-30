const router = require('express').Router();
const { orderController } = require('../controllers');

router.get('/', orderController.getAllOrders);

module.exports = router;
