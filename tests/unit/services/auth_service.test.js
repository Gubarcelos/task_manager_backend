const AuthService = require('../../../src/services/auth_service');
const userRepository = require('../../../src/repositories/user_repository');
const { comparePassword } = require('../../../src/utils/password_utils');
const jwt = require('jsonwebtoken');

jest.mock('../../../src/repositories/user_repository');
jest.mock('jsonwebtoken');
jest.mock('../../../src/utils/password_utils', () => ({
    comparePassword: jest.fn()
  }));


describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should generate a JWT token if login is successful', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const user = { _id: '123456789', email, password };
      userRepository.getUserByEmail.mockResolvedValue(user);
      comparePassword.mockResolvedValue(true);
      jwt.sign.mockReturnValue('mockedToken');
      
      const token = await AuthService.login(email, password);
      
      expect(token).toBe('mockedToken');
      expect(userRepository.getUserByEmail).toHaveBeenCalledWith(email);
      expect(comparePassword).toHaveBeenCalledWith(password, user.password);
      expect(jwt.sign).toHaveBeenCalledWith({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('should throw an error if user is not found', async () => {
      userRepository.getUserByEmail.mockResolvedValue(null);

      await expect(AuthService.login('nonexistent@example.com', 'password123')).rejects.toThrow('User not found');
    });

    it('should throw an error if password is incorrect', async () => {
      userRepository.getUserByEmail.mockResolvedValue({ _id: '123456789', email: 'test@example.com', password: 'correctPassword' });
      comparePassword.mockResolvedValue(false);

      await expect(AuthService.login('test@example.com', 'wrongPassword')).rejects.toThrow('incorrect password');
    });

    it('should throw an error if an error occurs during login', async () => {
      userRepository.getUserByEmail.mockRejectedValue(new Error('Database error'));

      await expect(AuthService.login('test@example.com', 'password123')).rejects.toThrow('Error during login Database error');
    });
  });
});