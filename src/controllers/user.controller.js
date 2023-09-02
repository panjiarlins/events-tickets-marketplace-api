const bcrypt = require('bcrypt');
const jwtController = require('./jwt.controller');
const {
  sequelize, User, Referral, Event, Voucher,
} = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await User.findAll({
        attributes: { exclude: ['password'] },
        include: [
          { model: Referral },
          {
            model: Event,
            include: [{ model: Voucher }],
          },
        ],
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

  getUserById: async (req, res) => {
    try {
      const result = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password'] },
        include: [
          { model: Referral },
          {
            model: Event,
            include: [{ model: Voucher }],
          },
        ],
      });
      if (!result) throw { code: 404, message: 'user not found' };

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      if (error.code && error.message) {
        res.status(error.code).json({
          status: 'error',
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.query;
      const result = await User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email', 'password'],
        where: { email },
        raw: true,
      });
      const isValid = await bcrypt.compare(password, result.password);
      if (!isValid) throw { code: 401, message: 'wrong email/password' };

      delete result.password;
      const token = jwtController.generateToken(result);
      console.log('test', result);
      res.status(200).json({
        status: 'success',
        data: { token },
      });
    } catch (error) {
      if (error.code && error.message) {
        res.status(error.code).json({
          status: 'error',
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },

  registerUser: async (req, res) => {
    try {
      await sequelize.transaction(async (t) => {
        const salt = await bcrypt.genSalt(10);
        const [userData, isCreated] = await User.findOrCreate({
          where: { email: req.body.email },
          defaults: {
            ...req.body,
            password: await bcrypt.hash(req.body.password, salt),
          },
          transaction: t,
        });
        if (!isCreated) throw { code: 400, message: 'email already exist' };

        const {
          id, firstName, lastName, email,
        } = userData;
        const { code } = await userData.createReferral(
          { code: `REF-${email}` },
          { transaction: t },
        );

        res.status(201).json({
          status: 'success',
          data: {
            id, firstName, lastName, email, code,
          },
        });
      });
    } catch (error) {
      if (error.code && error.message) {
        res.status(error.code).json({
          status: 'error',
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const result = await User.destroy({ where: { id: req.params.id } });
      if (!result) throw { code: 404, message: 'user not found' };

      res.sendStatus(204);
    } catch (error) {
      if (error.code && error.message) {
        res.status(error.code).json({
          status: 'error',
          message: error.message,
        });
        return;
      }
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },
};

module.exports = userController;
