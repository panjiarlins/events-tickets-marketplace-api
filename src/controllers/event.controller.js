const { ResponseError } = require('../errors');
const { Sequelize, sequelize, User, Event, Voucher } = require('../models');

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
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  getEventsByCity: async (req, res) => {
    try {
      const { city } = req.query;
      const result = await Event.findAll({
        where: {
          city: {
            [Sequelize.Op.like]: `%${city}%`,
          },
        },
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

  getEventById: async (req, res) => {
    try {
      const result = await Event.findByPk(req.params.id, {
        include: [{ model: Voucher }],
      });
      if (!result) throw new ResponseError('event not found', 404);

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

  createEvent: async (req, res) => {
    try {
      const userData = await User.findByPk(req.body.userId);
      if (!userData) throw new ResponseError('user not found', 404);

      const result = await Event.create(req.body);

      res.status(201).json({
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

  editEvent: async (req, res, next) => {
    try {
      await sequelize.transaction(
        {
          isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        },
        async (t) => {
          const { id } = req.params;
          await Event.update(req.body, {
            where: { id },
            fields: [
              'title',
              'imageUrl',
              'city',
              'address',
              'description',
              'price',
              'stock',
              'startAt',
            ],
            transaction: t,
          });
        }
      );

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },

  deleteEventById: async (req, res) => {
    try {
      const result = await Event.destroy({ where: { id: req.params.id } });
      if (!result) throw new ResponseError('event not found', 404);

      res.sendStatus(204);
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },
};

module.exports = eventController;
