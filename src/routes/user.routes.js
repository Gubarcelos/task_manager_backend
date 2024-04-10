const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const authenticateToken = require('../middleware/auth_middleware');

router.post('/', async (req, res, next) => {
  try {
    await userController.createUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',authenticateToken, async (req, res, next) => {
  try {
    await userController.getUserById(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.put('/:id',authenticateToken, async (req, res, next) => {
  try {
    await userController.updateUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',authenticateToken, async (req, res, next) => {
  try {
    await userController.deleteUser(req, res, next);
  } catch (error) {
    next(error);
  }
});

module.exports = router;