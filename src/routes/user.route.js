const { isEmpty, size } = require('lodash');
const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/', async (req, res) => {
  try {
    if (isEmpty(req.query)) {
      await userController.getAllUsers(req, res);
      return;
    }
    if (size(req.query) === 2 && req.query.email && req.query.password) {
      await userController.getUserByEmailAndPassword(req, res);
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
