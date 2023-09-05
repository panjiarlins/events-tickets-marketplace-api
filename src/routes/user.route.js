const router = require('express').Router();
const { userValidator } = require('../middlewares/validators');
const { userController } = require('../controllers');
const { userMulter, multerErrorHandler } = require('../middlewares/multers');

router.get('/', userController.getAllUsers);

router.get('/user/:id', userValidator.getUserById, userController.getUserById);

router.get(
  '/profile-image/:id',
  userValidator.getUserProfileImageByUserId,
  userController.getUserProfileImageByUserId,
);

router.post(
  '/',
  userMulter.profileImageUploader().single('profileImage'),
  multerErrorHandler,
  userValidator.registerUser,
  userController.registerUser,
);

router.post('/auth', userValidator.loginUser, userController.loginUser);

router.delete(
  '/user/:id',
  userValidator.deleteUserById,
  userController.deleteUserById,
);

module.exports = router;
