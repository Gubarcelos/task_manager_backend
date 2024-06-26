const userService = require('../services/user_service');

class UserController {

    async createUser(req, res, next) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            throw error;
        }
    }

    async getUserById(req, res,next) {
        try {
            const user = await userService.getUserById(req.params.id);
            if (!user) {
                const error = new Error('User not found');
                error.status = 404;
                throw error;
            }
            res.json(user);
        } catch (error) {
            throw error;
        }
    }

    async updateUser(req, res) {
        try {
            const user = await userService.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(req, res) {
        try {
            await userService.deleteUser(req.params.id);
            res.status(204).end();
        } catch (error) {
            throw error;
        }
    }

}
module.exports = new UserController();