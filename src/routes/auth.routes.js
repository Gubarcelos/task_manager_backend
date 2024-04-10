const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth_controller');

router.post('/login', async (req, res, next) => {
    try {
        await AuthController.login(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;