const { User, Sequelize: { Op } } = require('../models');

const userController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json({
        status: 'success',
        data: users,
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
