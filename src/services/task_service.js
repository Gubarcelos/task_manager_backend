const task_repository = require('../repositories/task_repository');
const TaskRepository = require('../repositories/task_repository');
const { isValidObjectId } = require('mongoose');

class TaskService {

    async createTask(taskData) {
        try {
            return await TaskRepository.createTask(taskData);
        } catch (error) {
            throw new Error('error on task creation ' + error.message);
        }
    }

    async getTaskById(taskId) {
        try {
            if (!isValidObjectId(taskId)) {
                throw new Error('invalid id');
            }
            const task = await TaskRepository.getTaskById(taskId);
            if (!task) {
                throw new Error('task not found');
            }
            return task;
        } catch (error) {
            throw new Error('error on get task by id ' + error.message);
        }
    }

    async updateTask(taskId, newData) {
        try {
            if (!isValidObjectId(taskId)) {
                throw new Error('invalid id');
            }
            const task = await TaskRepository.updateTask(taskId, newData);
            if (!task) {
                throw new Error('task not found');
            }
            return task;
        } catch (error) {
            throw new Error('error on task update ' + error.message);
        }
    }

    async findByUserId(userId, page = 1, pageSize = 10) {
        try {
            if (!isValidObjectId(userId)) {
                throw new Error('invalid id');
            }
            const result = await TaskRepository.getTasksByUserId(userId, page, pageSize);
            return result;
        } catch (error) {
            throw new Error('error on find by userId ' + error.message);
        }
    }

    async findTasksByDateRangeAndUserId(startDate, endDate, userId) {
        try {
            return await TaskRepository.findTasksByDateRangeAndUserId(startDate, endDate, userId);
        } catch (error) {
            throw new Error('task not found by this user ' + error.message);
        }
    }

    async isExpired(tasks) {
        const currentDate = new Date();
        const updatedTasks = [];
        for (const task of tasks) {
            if (task.finishDate < currentDate) {
                switch (task.status) {
                    case 'pending':
                    case 'in-progress':
                        task.status = 'expired';
                        await task.save();
                        updatedTasks.push(task);
                        break;
                    case 'expired':
                    case 'completed':
                        updatedTasks.push(task);
                        break;
                }
            }else {
                updatedTasks.push(task)
            }
        }

        return updatedTasks;
    }

    async getAllTasks(page, limit) {
        try {
            return await TaskRepository.getAllTasks(page, limit);
        } catch (error) {
            throw new Error('error on find all tasks: ' + error.message);
        }
    }

    async changeTaskStatus(taskId, newStatus) {
        try {
            const task = await TaskRepository.getTaskById(taskId);
            if (!task) {
                throw new Error('task not found');
            }
            task.status = newStatus;
            return await TaskRepository.updateTask(task._id, task);
        } catch (error) {
            throw new Error('error on task status update ' + error.message);
        }
    }

    async deleteTask(taskId) {
        try {
            const deletedTask = await TaskRepository.deleteTask(taskId);
            if (!deletedTask) {
                throw new Error('task not found');
            }
            return deletedTask;
        } catch (error) {
            throw new Error('Error on task deletion ' + error.message);
        }
    }

}

module.exports = new TaskService();