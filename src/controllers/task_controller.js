const TaskService = require('../services/task_service');
class TaskController {

  async createTask(req, res, next) {
    try {
      const task = await TaskService.createTask(req.body);
      res.status(200).json(task);
    } catch (error) {
      throw error;
    }
  }

  async getTaskById(req, res, next) {
    try {
      const taskId = req.params.id;
      const task = await TaskService.getTaskById(taskId);
      res.status(200).json(task);
    } catch (error) {
      throw error;
    }
  }

  async updateTask(req, res, next) {
    try {
      const taskId = req.params.id;
      const newData = req.body;
      const updatedTask = await TaskService.updateTask(taskId, newData);
      res.status(200).json(updatedTask);
    } catch (error) {
      throw error;
    }
  }

  async getByUserId(req, res, next) {
    try {
      const userId = req.params.id;
      const { page, pageSize } = req.query;

      const result = await TaskService.findByUserId(userId, parseInt(page), parseInt(pageSize));
      let { tasks, totalCount } = result;
      tasks = await TaskService.isExpired(tasks);

      res.header("Access-Control-Expose-Headers", "*")
      res.setHeader('X-Page', page);
      res.setHeader('X-Total-Count', totalCount);

      res.status(200).json(tasks);
    } catch (error) {
      throw error;
    }
  }

  async findTasksByDateRangeAndUserId(req, res, next) {
    try {
      const { startDate, endDate, userId } = req.query;
      const tasks = await TaskService.findTasksByDateRangeAndUserId(startDate, endDate, userId);
      res.status(200).json(tasks);
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(req, res, next) {
    try {
      const taskId = req.params.id;
      await TaskService.deleteTask(taskId);
      res.status(204).json();
    } catch (error) {
      throw new Error('Error on task deletion',error.message);
    }
  }

  async changeTaskStatus(req, res, next) {
    try {
      const taskId = req.params.id;
      const newStatus = req.body.status;
      const updatedTask = await TaskService.changeTaskStatus(taskId, newStatus);
      res.status(200).json(updatedTask);
    } catch (error) {
      throw error;
    }
  }

}
module.exports = new TaskController();