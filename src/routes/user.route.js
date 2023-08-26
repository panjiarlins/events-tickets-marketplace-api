const isEmpty = require('lodash/isEmpty');
const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/', async (req, res) => {
  try {
    if (isEmpty(req.query)) {
      await userController.getAllUsers(req, res);
      return;
    }

    res.status(400).json({
      status: 'error',
      message: 'unknown req query params',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error,
    });
  }
});

module.exports = router;
