const User = require('../models/user');

class UserRepository {

    async createUser(userData) {
        try {
            const user = new User(userData);
            return await user.save();
        } catch (error) {
            throw new Error('Error during user creation  ' + error.message);
        }
    }

    async updateUser(userId, newData) {
        try {
            return await User.findByIdAndUpdate(userId, newData, { new: true }).exec();
        } catch (error) {
            throw new Error('Error during user update  ' + error.message);
        }
    }

    async getAllUsers() {
        try {
            return await User.find().exec();
        } catch (error) {
            throw new Error('Error during user find all  ' + error.message);
        }
    }

    async getUserById(userId) {
        try {
            return await User.findById(userId).exec();
        } catch (error) {
            throw new Error('Error during user find by id  ' + error.message);
        }
    }

    async getUserByEmail(email) {
        try {
            return await User.findOne({ email }).exec();
        } catch (error) {
            throw new Error('Error during user find by mail  ' + error.message);
        }
    }

    async deleteUser(userId) {
        try {
            return await User.findByIdAndDelete(userId).exec();
        } catch (error) {
            throw new Error('Error during user deletion ' + error.message);
        }
    }
}

module.exports = new UserRepository();