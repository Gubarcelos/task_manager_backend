const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user_repository');

const authenticateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'empty token' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
module.exports = authenticateToken;
