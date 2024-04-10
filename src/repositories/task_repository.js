const Task = require('../models/task');

class TaskRepository {
  async createTask(taskData) {
    try {
      const newTask = new Task({
        _id: taskData._id || new mongoose.Types.ObjectId(),
        type: taskData.type,
        name: taskData.name,
        startDate: taskData.startDate,
        finishDate: taskData.finishDate,
        status: taskData.status,
        user: taskData.user, 
      });
      return await newTask.save();
    } catch (error) {
      throw new Error('Error during task creation: ' + error.message);
    }
  }

    async updateTask(taskId, newData) {
        try {
          const updatedTask = await Task.findByIdAndUpdate(taskId, newData, { new: true }).exec();
          if(!updatedTask){
            throw new Error('Task not found');
          }
          return updatedTask;
        } catch (error) {
          throw new Error('Error during task update' + error.message);
        }
      }
  
    async getTaskById(taskId) {
      try {
        return await Task.findById(taskId).exec();
      } catch (error) {
        throw new Error('Error during find by id' + error.message);
      }
    }
  
    async findTasksByDateRange(startDate, endDate) {
      try {
        return await Task.find({
          startDate: { $gte: startDate },
          finishDate: { $lte: endDate }
        }).exec();
      } catch (error) {
        throw new Error('Error during task find by range date' + error.message);
      }
    }
  
    async getAllTasks(page, limit) {
      try {
        const tasks = await Task.find().skip((page - 1) * limit).limit(limit).exec();
        const totalTasks = await Task.countDocuments().exec();
        return { tasks, totalTasks };
      } catch (error) {
        throw new Error('Error during task find all' + error.message);
      }
    }

    async deleteTask(taskId) {
        try {
          const daletedTask = await Task.findByIdAndDelete(taskId).exec();
          if(!daletedTask) {
            throw new Error('task not found');
          }
          return this.deleteTask;
        } catch (error) {
            throw new Error('Error during task deletion' + error.message);
        }
      }
    }
    
  module.exports = new TaskRepository();