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
      const result = await User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        where: { email, password },
      });
      if (!result) {
        res.status(404).json({
          status: 'error',
          message: 'user not found',
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

  createUser: async (req, res) => {
    try {
      const [{
        id, firstName, lastName, email,
      }, isCreated] = await User.findOrCreate({
        where: { email: req.body.email },
        defaults: { ...req.body },
      });
      if (!isCreated) {
        res.status(400).json({
          status: 'error',
          message: 'email already exist',
        });
        return;
      }
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

  deleteUserById: async (req, res) => {
    try {
      const resullt = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!resullt) {
        res.status(404).json({
          status: 'error',
          message: 'user not found',
        });
        return;
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },
};

module.exports = userController;
