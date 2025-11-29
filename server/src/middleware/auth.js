// server/src/middleware/auth.js
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  if (token !== 'Bearer valid-token') {
    return res.status(403).json({ message: 'Invalid token' });
  }
  
  next();
};

module.exports = authMiddleware;
