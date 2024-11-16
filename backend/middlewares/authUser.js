const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = authUser;
