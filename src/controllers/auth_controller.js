const AuthService = require('../services/auth_service');
class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const token = await AuthService.login(email, password);
            res.setHeader('Authorization', `Bearer ${token}`);
            res.status(204).send();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new AuthController();