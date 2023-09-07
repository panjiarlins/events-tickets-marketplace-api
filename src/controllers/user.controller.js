const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const { ResponseError } = require('../errors');
const {
  Sequelize,
  sequelize,
  User,
  Referral,
  ReferralAction,
  Event,
  Voucher,
} = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const result = await User.findAll({
        attributes: { exclude: ['password', 'profileImage'] },
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
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const result = await User.findByPk(req.params.id, {
        attributes: { exclude: ['password', 'profileImage'] },
        include: [
          { model: Referral },
          {
            model: Event,
            include: [{ model: Voucher }],
          },
        ],
      });
      if (!result) throw new ResponseError('user not found', 404);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // check user email
      const result = await User.findOne({
        attributes: ['id', 'firstName', 'lastName', 'email', 'password'],
        where: { email },
        raw: true,
      });
      if (!result) throw new ResponseError('wrong email', 401);

      // check user password
      const isValid = await bcrypt.compare(password, result.password);
      if (!isValid) throw new ResponseError('wrong password', 401);

      // generate token
      delete result.password;
      const token = jwt.sign(result, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h',
      });

      // get user data
      const userData = await User.findByPk(result.id, {
        attributes: { exclude: ['password', 'profileImage'] },
        include: [
          { model: Referral },
          {
            model: Event,
            include: [{ model: Voucher }],
          },
        ],
      });
      if (!userData) throw new ResponseError('user not found', 404);

      res.status(200).json({
        status: 'success',
        data: { token, user: userData },
      });
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  registerUser: async (req, res) => {
    try {
      await sequelize.transaction(
        {
          isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        },
        async (t) => {
          if (req.file) {
            // get user profileImage
            req.body.profileImage = await sharp(req.file.buffer)
              .png()
              .toBuffer();
          }

          // create user
          const salt = await bcrypt.genSalt(10);
          const [userData, isCreated] = await User.findOrCreate({
            where: { email: req.body.email },
            defaults: {
              ...req.body,
              password: await bcrypt.hash(req.body.password, salt),
            },
            transaction: t,
          });
          if (!isCreated) throw new ResponseError('email already exist', 400);

          // create referral code
          const referredUserData = await userData.createReferral(
            { code: `REF-${userData.email}` },
            { transaction: t }
          );

          if (req.body.referrerCode) {
            // check referralCode
            const referrerUserData = await Referral.findOne({
              where: { code: req.body.referrerCode },
              transaction: t,
            });
            if (!referrerUserData)
              throw new ResponseError('referralCode not found', 404);

            // increase referral point
            await referrerUserData.increment(
              { point: 50000 },
              { transaction: t }
            );
            await referredUserData.increment(
              { point: 50000 },
              { transaction: t }
            );

            // create referral action
            await ReferralAction.create(
              {
                referrerUserId: referrerUserData.userId,
                referredUserId: referredUserData.userId,
              },
              { transaction: t }
            );
          }

          // get final user data
          const result = await User.findByPk(userData.id, {
            attributes: { exclude: ['password', 'profileImage'] },
            include: [{ model: Referral }],
            transaction: t,
          });

          res.status(201).json({
            status: 'success',
            data: result,
          });
        }
      );
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  getUserProfileImageByUserId: async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id);
      if (!userData?.profileImage)
        throw new ResponseError('profileImage not found', 404);

      res.set('Content-type', 'image/png').send(userData.profileImage);
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  deleteUserById: async (req, res) => {
    try {
      const result = await User.destroy({ where: { id: req.params.id } });
      if (!result) throw new ResponseError('user not found', 404);

      res.sendStatus(204);
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },
};

module.exports = userController;
