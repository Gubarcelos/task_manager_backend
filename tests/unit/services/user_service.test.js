const UserService = require('../../../src/services/user_service');
const UserRepository = require('../../../src/repositories/user_repository');

jest.mock('../../../src/repositories/user_repository');
jest.mock('../../../src/utils/password_utils', () => ({
    encryptPassword: jest.fn(password => `hashed_${password}`)
  }));

describe('UserService', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should create a new user', async () => {
        const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123' };
        const expectedUserData = { name: 'John Doe', email: 'john@example.com', password: 'hashed_password123' }; 
      
        UserRepository.createUser.mockResolvedValueOnce(userData);
      
        const result = await UserService.createUser(userData);

        delete result._id;
      
        expect(UserRepository.createUser).toHaveBeenCalledWith(expect.objectContaining(expectedUserData));
        expect(result).toEqual(userData);
    });
  
    it('should get a user by ID', async () => {
      const userId = 'user123';
      const user = { _id: userId, name: 'John Doe', email: 'john@example.com' };
      UserRepository.getUserById.mockResolvedValueOnce(user);
  
      const result = await UserService.getUserById(userId);
  
      expect(UserRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });
  
    it('should update a user', async () => {
      const userId = 'user123';
      const newData = { name: 'Updated Name' };
      const updatedUser = { _id: userId, name: 'Updated Name', email: 'john@example.com',password: 'hashed_password123' };
      UserRepository.updateUser.mockResolvedValueOnce(updatedUser);
  
      const result = await UserService.updateUser(userId, newData);
  
      expect(updatedUser).toHaveBeenCalledWith(result);
      expect(result).toEqual(updatedUser);
    });
  
    it('should delete a user', async () => {
      const userId = 'user123';
      UserRepository.deleteUser.mockResolvedValueOnce(true);

      const result = await UserService.deleteUser(userId);
  
      expect(UserRepository.deleteUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual(true);
    });

  });