const {
  Sequelize, sequelize, User, Event, Voucher,
} = require('../models');

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const result = await Event.findAll({
        include: [{ model: Voucher }],
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

  getEventById: async (req, res) => {
    try {
      const result = await Event.findByPk(req.params.id, {
        include: [{ model: Voucher }],
      });
      if (!result) throw { code: 404, message: 'event not found' };

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

  createEvent: async (req, res) => {
    try {
      const userData = await User.findByPk(req.body.userId);
      if (!userData) throw { code: 404, message: 'user not found' };

      const result = await Event.create(req.body);
      res.status(201).json({
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

  editEvent: async (req, res, next) => {
    try {
      await sequelize.transaction({
        isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
      }, async (t) => {
        const { id } = req.params;
        await Event.update(
          req.body,
          {
            where: { id },
            fields: [
              'title', 'imageUrl', 'city', 'address',
              'description', 'price', 'stock', 'startAt',
            ],
            transaction: t,
          },
        );
      });
      next();
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },

  deleteEventById: async (req, res) => {
    try {
      const result = await Event.destroy({ where: { id: req.params.id } });
      if (!result) throw { code: 404, message: 'event not found' };
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

module.exports = eventController;
