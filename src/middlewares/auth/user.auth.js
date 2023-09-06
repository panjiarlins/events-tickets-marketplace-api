const jwt = require('jsonwebtoken');
const { ResponseError } = require('../../errors');

const userAuth = {
  authUserByIdParams: (req, res, next) => {
    try {
      jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) throw new ResponseError(err, 401);
        if (decoded?.id !== req.params.id)
          throw new ResponseError('user unauthorized', 401);
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

module.exports = userAuth;
