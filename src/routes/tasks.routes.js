const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task_controller');
const authenticateToken = require('../middleware/auth_middleware');

router.post('/',authenticateToken, async (req, res, next) => {
    try {
        await TaskController.createTask(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.get('/search',authenticateToken, async (req, res, next) => {
    try {
        await TaskController.findTasksByDateRangeAndUserId(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/user/:id',authenticateToken, async (req, res, next) => {
    try {
        await TaskController.getByUserId(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',authenticateToken, async (req, res, next) => {
    try {
        await TaskController.getTaskById(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.put('/:id',authenticateToken, async (req, res, next) => {
    try {
        await TaskController.updateTask(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id',authenticateToken, async (req, res, next) => {
    try {
        await TaskController.deleteTask(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.put('/:id/status',authenticateToken, async (req, res, next) => {
    try {
        await TaskController.changeTaskStatus(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.post('/check-expired',authenticateToken, async (req, res, next) => {
    try {
        await TaskController.checkTaskExpired(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;