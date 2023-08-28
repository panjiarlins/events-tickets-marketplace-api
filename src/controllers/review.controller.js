const { Review } = require('../models');

const reviewController = {
    getAllReviews: async (req,res) => {
        try {
            const result = await Review.findAll();
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                status:'error',
                message: error,
            });
        }
    },

    getReviewByOrderId: async (req, res) => {
        try {
            const result = await Review.findByPk(req.params.id);
            if (!result) {
                res.status(404).json({
                    status: 'error',
                    message: 'review not found',
                });
                return;
            }
            res.status(200).json({
                status: 'success',
                data: result,
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    },

    createReview: async (req,res) => {
        try {
            const {
                id, comment, rating,
            } = await Review.create({ ...req.body });
            res.status(201).json({
                status: 'success',
                data: {
                    id, comment, rating,
                },
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    },

    deleteReviewByOrderId: async (req,res) => {
        try {
            const result = await Review.destroy({
                where: {
                    id: req.params.id,
                },
            });
            if (!result){
                res.status(404).json({
                    status: 'error',
                    message: 'user not found',
                });
                return;
            }
            res.sendStatus(204)
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error,
            });
        }
    },
};

module.exports = reviewController;