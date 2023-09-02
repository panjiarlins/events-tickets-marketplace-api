const router = require('express').Router();
const { reviewController } = require('../controllers');

router.get('/', reviewController.getAllReviews);
router.get('/:orderId', reviewController.getReviewByOrderId);
router.post('/', reviewController.createReview);
router.delete('/:orderId', reviewController.deleteReviewByOrderId);

module.exports = router;
