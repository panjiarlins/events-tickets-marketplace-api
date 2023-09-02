const router = require('express').Router();
const { userValidator } = require('../middlewares/validators');
const { userController } = require('../controllers');

router.get('/', userController.getAllUsers);
router.get('/user/:id', userValidator.getUserById, userController.getUserById);
router.post('/', userValidator.registerUser, userController.registerUser);
router.post('/auth', userController.loginUser);
router.delete('/user/:id', userController.deleteUserById);

module.exports = router;
