const jwt = require('jsonwebtoken');
const { ResponseError } = require('../../errors');
const { Event } = require('../../models');

const voucherAuth = {
  authCreateVoucher: async (req, res, next) => {
    try {
      const eventData = await Event.findByPk(req.body.eventId, {
        attributes: ['userId'],
      });
      if (!eventData) throw new ResponseError('event not found', 404);

      jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) throw new ResponseError(err, 401);
        if (decoded?.id !== eventData.userId)
          throw new ResponseError('unauthorized', 401);
      });

      next();
    } catch (error) {
      res.status(error?.statusCode || 500).json({
        status: 'error',
        message: error?.message || error,
      });
    }
  },
};

module.exports = voucherAuth;
