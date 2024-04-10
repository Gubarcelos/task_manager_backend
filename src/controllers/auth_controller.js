const AuthService = require('../services/auth_service');
class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const token = await AuthService.login(email, password);
            res.json({ token });
        } catch (error) {
            return error;
        }
    }
}

module.exports = new AuthController();