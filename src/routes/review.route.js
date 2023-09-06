const router = require('express').Router();
const { reviewController } = require('../controllers');
const { reviewValidator } = require('../middlewares/validators');

router.get('/', reviewController.getAllReviews);
router.get(
  '/:orderId',
  reviewValidator.getReviewByOrderId,
  reviewController.getReviewByOrderId
);
router.post('/', reviewValidator.createReview, reviewController.createReview);
router.delete(
  '/:orderId',
  reviewValidator.deleteReviewByOrderId,
  reviewController.deleteReviewByOrderId
);

module.exports = router;
