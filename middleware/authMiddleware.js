const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;  // user object with _id available
    next();

  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
