const JWT = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
        req.studentId = decoded.studentId;
        req.rollNumber = decoded.rollNumber;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;