const router = require('express').Router();
const { reviewController } = require('../controllers');

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewByOrderId);
router.post('/', reviewController.createReview);
router.delete('/:id', reviewController.deleteReviewByOrderId);

module.exports = router;
