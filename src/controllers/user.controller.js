const { User, Sequelize: { Op } } = require('../models');

const userController = {
  async getAllUsers(req, res) {
    try {
      const result = await User.findAll();
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
  async getUserByEmailAndPassword(req, res) {
    try {
      const { email, password } = req.query;
      const result = await User.findAll({
        where: { email, password },
      });
      if (!result.length) {
        res.status(404).json({
          status: 'error',
          message: 'user not found',
        });
        return;
      }
      res.status(200).json({
        status: 'success',
        data: result[0],
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },
};

module.exports = userController;
