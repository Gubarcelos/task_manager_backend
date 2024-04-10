const userRepository = require('../repositories/user_repository');
const { encryptPassword } = require('../utils/password_utils');

class UserService {
    async createUser(userData) {
        try {
            const { password } = userData;
            const hashedPassword = await encryptPassword(password);
            const newUser = { ...userData, password: hashedPassword };
            return await userRepository.createUser(newUser);
        } catch (error) {
            throw new Error('Erro ao criar usuário: ' + error.message);
        }
    }
    async getUserById(userId) {
        try {
            return await userRepository.getUserById(userId);
        } catch (error) {
            throw new Error('Erro ao buscar usuário por ID: ' + error.message);
        }
    }
    async updateUser(userId, newData) {
        try {
            return await userRepository.updateUser(userId, newData);
        } catch (error) {
            throw new Error('Erro ao atualizar usuário: ' + error.message);
        }
    }

    async deleteUser(userId) {
        try {
            return await userRepository.deleteUser(userId);
        } catch (error) {
            throw new Error('Erro ao excluir usuário: ' + error.message);
        }
    }
}

module.exports = new UserService();