const mongoose = require('mongoose');
const TaskRepository = require('../../../src/repositories/task_repository');
const Task = require('../../../src/models/task');
require('dotenv').config();

describe('TaskRepository', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });


  it('should create a new task', async () => {
    const userData = {
        _id: new mongoose.Types.ObjectId()
      };
    const taskData = {
      _id: new mongoose.Types.ObjectId(),  
      type: 'Test',
      name: 'Test Task',
      startDate: new Date(),
      finishDate: new Date(),
      status: 'pending',
      user : userData
    };
    const newTask = await TaskRepository.createTask(taskData);
    expect(newTask).toBeDefined();
  });

  it('should get a task by ID', async () => {
    const task = await Task.findOne({ name: 'Test Task' });
    const foundTask = await TaskRepository.getTaskById(task._id);
    expect(foundTask).toBeDefined();
  });

  it('should find tasks within a date range', async () => {
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-01-31');
    const tasksInRange = await TaskRepository.findTasksByDateRange(startDate, endDate);
    expect(tasksInRange).toBeDefined();
  });

  it('should get all tasks with pagination', async () => {
    const page = 1;
    const limit = 10;
    const { tasks, totalTasks } = await TaskRepository.getAllTasks(page, limit);
    expect(tasks).toBeDefined();
    expect(totalTasks).toBeDefined();
  });

  it('should update a task by ID', async () => {
    const task = await Task.findOne({ name: 'Test Task' });
    const newData = { status: 'completed' };
    const updatedTask = await TaskRepository.updateTask(task._id, newData);
    expect(updatedTask).toBeDefined();
    expect(updatedTask.status).toBe('completed');
  });

  it('should throw an error when updating a non-existent task', async () => {
    const nonExistentTaskId = new mongoose.Types.ObjectId();
    const newData = { status: 'completed' };
    await expect(TaskRepository.updateTask(nonExistentTaskId, newData)).rejects.toThrow(
      'Task not found'
    );
  });

  it('should delete a task by ID', async () => {
    const task = await Task.findOne({ name: 'Test Task' });
    const deletedTask = await TaskRepository.deleteTask(task._id);
    expect(deletedTask).toBeDefined();
  });

  it('should throw an error when deleting a non-existent task', async () => {
    const nonExistentTaskId = new mongoose.Types.ObjectId();
    await expect(TaskRepository.deleteTask(nonExistentTaskId)).rejects.toThrow(
      'task not found'
    );
  });



});