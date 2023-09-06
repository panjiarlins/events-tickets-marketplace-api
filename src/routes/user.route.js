const router = require('express').Router();
const { userValidator } = require('../middlewares/validators');
const { userController } = require('../controllers');
const { userMulter, multerErrorHandler } = require('../middlewares/multers');
const { userAuth } = require('../middlewares/auth');

// GET all users
router.get('/', userController.getAllUsers);

// GET user by userId
router.get(
  '/user/:id',
  userAuth.authUserByIdParams,
  userValidator.getUserById,
  userController.getUserById
);

// GET user profileImage by userId
router.get(
  '/profile-image/:id',
  userValidator.getUserProfileImageByUserId,
  userController.getUserProfileImageByUserId
);

// POST user register
router.post(
  '/',
  userMulter.profileImageUploader().single('profileImage'),
  multerErrorHandler,
  userValidator.registerUser,
  userController.registerUser
);

// POST user login
router.post('/auth', userValidator.loginUser, userController.loginUser);

// DELETE user by userId
router.delete(
  '/user/:id',
  userAuth.authUserByIdParams,
  userValidator.deleteUserById,
  userController.deleteUserById
);

module.exports = router;
