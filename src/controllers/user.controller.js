const { User } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
      });
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
  getUserByEmailAndPassword: async (req, res) => {
    try {
      const { email, password } = req.query;
      const result = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
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
  createUser: async (req, res) => {
    try {
      const {
        id, firstName, lastName, email,
      } = await User.create({ ...req.body });
      res.status(201).json({
        status: 'success',
        data: {
          id, firstName, lastName, email,
        },
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
