const Bug = require('../models/Bug');

// Auto-increment serial number per user
const AutoIncrement = async (userId) => {
  const lastBug = await Bug.findOne({ user: userId }).sort({ serialNumber: -1 });
  return lastBug ? lastBug.serialNumber + 1 : 1;
};

module.exports = AutoIncrement;
