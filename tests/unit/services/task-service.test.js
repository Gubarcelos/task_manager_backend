const TaskService = require('../../../src/services/task_service');
const TaskRepository = require('../../../src/repositories/task_repository');
const mongoose = require('mongoose');
const { isValidObjectId } = require('mongoose')
jest.mock('../../../src/repositories/task_repository');

describe('TaskService', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTask', () => {
        it('should create a new task', async () => {
            const taskData = { name: 'Test Task', type: 'Test', userId: '123456789' };
            TaskRepository.createTask.mockResolvedValue(taskData);
            const createdTask = await TaskService.createTask(taskData);
            expect(createdTask).toEqual(taskData);
        });

        it('should throw an error if task creation fails', async () => {
            const taskData = { name: 'Test Task', type: 'Test', userId: '123456789' };
            TaskRepository.createTask.mockRejectedValue(new Error('Failed to create task'));
            await expect(TaskService.createTask(taskData)).rejects.toThrow('error on task creation Failed to create task');
        });
    });

    describe('getTaskById', () => {
        it('should return a task if a valid ID is provided', async () => {
            const taskId = '123456789012345678901234';
            const taskData = { _id: taskId, name: 'Test Task', type: 'Test' };
            TaskRepository.getTaskById.mockResolvedValue(taskData);
            const task = await TaskService.getTaskById(taskId);
            expect(task).toEqual(taskData);
        });

        it('should throw an error if an invalid ID is provided', async () => {
            const invalidTaskId = 'invalidId';
            await expect(TaskService.getTaskById(invalidTaskId)).rejects.toThrow('invalid id');
        });

        it('should throw an error if no task is found with the provided ID', async () => {
            const taskId = '123456789012345678901234';
            TaskRepository.getTaskById.mockResolvedValue(null);
            await expect(TaskService.getTaskById(taskId)).rejects.toThrow('task not found');
        });

        it('should throw an error if TaskRepository throws an error', async () => {
            const taskId = '123456789012345678901234';
            TaskRepository.getTaskById.mockRejectedValue(new Error('Failed to fetch task'));
            await expect(TaskService.getTaskById(taskId)).rejects.toThrow('error on get task by id Failed to fetch task');
        });
    });

    describe('updateTask', () => {
        
        it('should update a task', async () => {
            const taskId = '123456789012345678901234';
            const newData = { name: 'Updated Task' };
            const updatedTask = { _id: taskId, name: 'Updated Task', type: 'Test', userId: '123456789' };
            TaskRepository.updateTask.mockResolvedValue(updatedTask);
            const result = await TaskService.updateTask(taskId, newData);
            expect(result).toEqual(updatedTask);
        });

        it('should throw an error if task ID is invalid', async () => {
            const taskId = 'invalidId';
            const newData = { name: 'Updated Task' };
            await expect(TaskService.updateTask(taskId, newData)).rejects.toThrow('error on task update invalid id');
        });

        it('should throw an error if task is not found', async () => {
            const taskId = '123456789';
            const newData = { name: 'Updated Task' };
            TaskRepository.updateTask.mockResolvedValue(null);
            await expect(TaskService.updateTask(taskId, newData)).rejects.toThrow('error on task update invalid id');
        });

        it('should throw an error if updating task fails', async () => {
            const taskId = '123456789';
            const newData = { name: 'Updated Task' };
            TaskRepository.updateTask.mockRejectedValue(new Error('Failed to update task'));
            await expect(TaskService.updateTask(taskId, newData)).rejects.toThrow('error on task update invalid id');
        });
    });

    describe('TaskService - findByUserId', () => {
        it('should find tasks by user ID', async () => {
          const userId = new mongoose.Types.ObjectId();
          const taskId = new mongoose.Types.ObjectId();
          const tasks = { taskId,name: 'Test Task', userId };
          TaskRepository.getTasksByUserId.mockResolvedValue(tasks);
          const foundTasks = await TaskService.findByUserId(userId);
          expect(foundTasks).toEqual(tasks);
        });
      
        it('should throw an error if user ID is invalid', async () => {
          const invalidUserId = 'invalid_id';
          await expect(TaskService.findByUserId(invalidUserId)).rejects.toThrow('error on find by userId');
        });
      
        it('should throw an error if no tasks are found for the user', async () => {
          const userId = '123456789';
          TaskRepository.getTasksByUserId.mockResolvedValue(null);
          await expect(TaskService.findByUserId(userId)).rejects.toThrow('error on find by userId');
        });
      
        it('should throw an error if TaskRepository throws an error', async () => {
          const userId = '123456789';
          TaskRepository.getTasksByUserId.mockRejectedValue(new Error('Failed to find tasks'));
          await expect(TaskService.findByUserId(userId)).rejects.toThrow('error on find by userId');
        });
      });

      describe('TaskService - findTasksByDateRangeAndUserId', () => {
        afterEach(() => {
          jest.clearAllMocks();
        });
      
        it('should find tasks by date range and user ID', async () => {
          const startDate = new Date('2024-01-01');
          const endDate = new Date('2024-01-31');
          const userId = '123456789';
          const expectedTasks = [{ name: 'Task 1' }, { name: 'Task 2' }];
          TaskRepository.findTasksByDateRangeAndUserId.mockResolvedValue(expectedTasks);
          
          const tasks = await TaskService.findTasksByDateRangeAndUserId(startDate, endDate, userId);
          
          expect(tasks).toEqual(expectedTasks);
          expect(TaskRepository.findTasksByDateRangeAndUserId).toHaveBeenCalledWith(startDate, endDate, userId);
        });
      
        it('should throw an error if TaskRepository throws an error', async () => {
          const startDate = new Date('2024-01-01');
          const endDate = new Date('2024-01-31');
          const userId = '123456789';
          TaskRepository.findTasksByDateRangeAndUserId.mockRejectedValue(new Error('Failed to find tasks'));
          
          await expect(TaskService.findTasksByDateRangeAndUserId(startDate, endDate, userId)).rejects.toThrow('task not found by this user Failed to find tasks');
        });
      });

      
describe('TaskService - getAllTasks', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should get all tasks with pagination', async () => {
      const page = 1;
      const limit = 10;
      const tasks = [{ name: 'Task 1' }, { name: 'Task 2' }];
      const totalTasks = 2;
      TaskRepository.getAllTasks.mockResolvedValue({ tasks, totalTasks });
  
      const result = await TaskService.getAllTasks(page, limit);
  
      expect(result.tasks).toEqual(tasks);
      expect(result.totalTasks).toEqual(totalTasks);
    });
  
    it('should throw an error if getAllTasks fails', async () => {
      const page = 1;
      const limit = 10;
      TaskRepository.getAllTasks.mockRejectedValue(new Error('Failed to get all tasks'));
  
      await expect(TaskService.getAllTasks(page, limit)).rejects.toThrow('error on find all tasks: Failed to get all tasks');
    });
  });
  describe('TaskService - changeTaskStatus', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should change task status successfully', async () => {
      const taskId = '123456789';
      const newStatus = 'completed';
      const task = { _id: taskId, status: 'pending' };
      TaskRepository.getTaskById.mockResolvedValue(task);
      TaskRepository.updateTask.mockResolvedValue({ ...task, status: newStatus });
  
      const updatedTask = await TaskService.changeTaskStatus(taskId, newStatus);
      expect(updatedTask).toEqual({ ...task, status: newStatus });
    });
  
    it('should throw an error if task is not found', async () => {
      const taskId = '123456789';
      const newStatus = 'completed';
      TaskRepository.getTaskById.mockResolvedValue(null);
  
      await expect(TaskService.changeTaskStatus(taskId, newStatus)).rejects.toThrow('task not found');
    });
  
    it('should throw an error if updating task status fails', async () => {
      const taskId = '123456789';
      const newStatus = 'completed';
      const task = { _id: taskId, status: 'pending' };
      TaskRepository.getTaskById.mockResolvedValue(task);
      TaskRepository.updateTask.mockRejectedValue(new Error('Failed to update task status'));
  
      await expect(TaskService.changeTaskStatus(taskId, newStatus)).rejects.toThrow('error on task status update');
    });
  });
  describe('TaskService - deleteTask', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should delete a task', async () => {
      const taskId = '123456789';
      const deletedTask = { _id: taskId, name: 'Test Task' };
      TaskRepository.deleteTask.mockResolvedValue(deletedTask);
      const result = await TaskService.deleteTask(taskId);
      expect(result).toEqual(deletedTask);
    });
  
    it('should throw an error if task is not found', async () => {
      const taskId = '123456789';
      TaskRepository.deleteTask.mockResolvedValue(null);
      await expect(TaskService.deleteTask(taskId)).rejects.toThrow('task not found');
    });
  
    it('should throw an error if task deletion fails', async () => {
      const taskId = '123456789';
      TaskRepository.deleteTask.mockRejectedValue(new Error('Failed to delete task'));
      await expect(TaskService.deleteTask(taskId)).rejects.toThrow('Error on task deletion Failed to delete task');
    });
  });
});