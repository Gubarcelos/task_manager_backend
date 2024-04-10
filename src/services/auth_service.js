const { comparePassword } = require('../utils/password_utils');
const userRepository = require('../repositories/user_repository');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
    async login(email, password) {
        try {
            const user = await userRepository.getUserByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const canAcess = await comparePassword(password, user.password);
            if(!canAcess){
                throw new Error('incorrect password');
            }
    
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
            return token;
        }catch (error) {
            throw new Error('Error during login ' + error.message);
        }
    }
}
module.exports = new AuthService();