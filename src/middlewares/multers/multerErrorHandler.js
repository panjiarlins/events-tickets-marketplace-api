const { MulterError } = require('multer');

const multerErrorHandler = (err, req, res, next) => {
  if (err instanceof MulterError) {
    res.status(400).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  if (err) {
    res.status(err.statusCode || 500).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  next();
};

module.exports = multerErrorHandler;
