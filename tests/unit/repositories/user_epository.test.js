const mongoose = require('mongoose');
const UserRepository = require('../../../src/repositories/user_repository');
const User = require('../../../src/models/user');
require('dotenv').config();

describe('UserRepository', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a new user', async () => {
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    const userData = {
      _id: new mongoose.Types.ObjectId(),
      name: 'Test User',
      email: 'test'+randomNumber+'@example.com',
      password: 'testpassword',
    };
    const newUser = await UserRepository.createUser(userData);
    expect(newUser).toBeDefined();
  });

  it('should get a user by ID', async () => {
    const user = await User.findOne({ name: 'Test User' });
    const foundUser = await UserRepository.getUserById(user._id);
    expect(foundUser).toBeDefined();
  });

  it('should get a user by email', async () => {
    const foundUser = await UserRepository.getUserByEmail('test@example.com');
    expect(foundUser).toBeDefined();
  });

  it('should update a user', async () => {
    const user = await User.findOne({ name: 'Test User' });
    const newData = { name: 'Updated Test User' };
    const updatedUser = await UserRepository.updateUser(user._id, newData);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toEqual('Updated Test User');

  });

  it('should throw an error when updating a non-existent user', async () => {
    const nonExistentUserId = new mongoose.Types.ObjectId();
    const newData = { name: 'teste_error' };
    await expect(UserRepository.updateUser(nonExistentUserId, newData)).rejects.toThrow(
      'user not found'
    );
  });

  it('should delete a user', async () => {
    const user = await User.findOne({ name: 'Updated Test User'});
    const deletedUser = await UserRepository.deleteUser(user._id);
    expect(deletedUser).toBeDefined();
  });

  it('should throw an error when deleting a non-existent user', async () => {
    const nonExistentUserId = new mongoose.Types.ObjectId();
    await expect(UserRepository.deleteUser(nonExistentUserId)).rejects.toThrow(
      'user not found'
    );
  });


});