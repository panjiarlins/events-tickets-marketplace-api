const { Event } = require('../models');

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const result = await Event.findAll();
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
      const result = await Event.findByPk(req.params.id);
      if (!result) {
        res.status(404).json({
          status: 'error',
          message: 'event not found',
        });
        return;
      }
      res.status(200).json({
        status: 'success',
        data: {
          id: result.id,
          title: result.title,
          imageUrl: result.imageUrl,
          city: result.city,
          address: result.address,
          description: result.description,
          price: result.price,
          stock: result.stock,
          startAt: result.startAt,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },

  createEvent(req, res) {
    Event.create({ ...req.body })
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send(err?.message));
  },

  editEvent(req, res, next) {
    const { id } = req.params;
    Event.update({
      ...req.body,
    }, {
      where: { id },
    }).then(() => next())
      .catch((err) => res.status(500).send(err?.message));
  },

  deleteEventById: async (req, res) => {
    try {
      const result = await Event.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!result) {
        res.status(404).json({
          status: 'error',
          message: 'event not found',
        }); return;
      } res.send('deleted success');
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error,
      });
    }
  },
};

module.exports = eventController;
