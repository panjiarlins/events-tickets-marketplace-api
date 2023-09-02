const router = require('express').Router();
const { userValidator } = require('../middlewares/validators');
const { userController } = require('../controllers');

router.get('/', userController.getAllUsers);
router.get('/user/:id', userValidator.getUserById, userController.getUserById);
router.post('/', userValidator.registerUser, userController.registerUser);
router.post('/auth', userValidator.loginUser, userController.loginUser);
router.delete('/user/:id', userValidator.deleteUserById, userController.deleteUserById);

module.exports = router;
