const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/task_controller');
const authenticateToken = require('../middleware/auth_middleware');

router.post('/', async (req, res, next) => {
    try {
        await TaskController.createTask(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.get('/search', async (req, res, next) => {
    try {
        await TaskController.findTasksByDateRangeAndUserId(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/user/:id', async (req, res, next) => {
    try {
        await TaskController.getByUserId(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        await TaskController.getTaskById(req, res, next);
    } catch (error) {
        next(error);
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        await TaskController.updateTask(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await TaskController.deleteTask(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.put('/:id/status', async (req, res, next) => {
    try {
        await TaskController.changeTaskStatus(req, res, next);
    } catch (error) {
        next(error);
    }
});

router.post('/check-expired', async (req, res, next) => {
    try {
        await TaskController.checkTaskExpired(req, res, next);
    } catch (error) {
        next(error);
    }
});

module.exports = router;