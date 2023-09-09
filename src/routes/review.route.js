const router = require('express').Router();
const { reviewValidator } = require('../middlewares/validators');
const { reviewAuth } = require('../middlewares/auth');
const { reviewController } = require('../controllers');

// GET all reviews
router.get('/', reviewController.getAllReviews);

// GET review by orderId
router.get(
  '/:orderId',
  reviewValidator.getReviewByOrderId,
  reviewController.getReviewByOrderId
);

// POST new review
router.post(
  '/',
  reviewValidator.createReview,
  reviewAuth.authCreateReview,
  reviewController.createReview
);

// DELETE review by orderId
router.delete(
  '/:orderId',
  reviewValidator.deleteReviewByOrderId,
  reviewAuth.authReviewByOrderIdParams,
  reviewController.deleteReviewByOrderId
);

module.exports = router;
