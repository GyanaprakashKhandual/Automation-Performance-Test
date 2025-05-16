const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  serialNumber: { 
    type: Number, 
    required: true 
  },
  bugModule: {
    type: String,
    required: true
  },
  bugType: {
    type: String,
    required: true
  },
  bugDescription: {
    type: String,
    required: true,
  },
  requirement: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    required: true,
    enum: ['Critical', 'High', 'Medium', 'Low']
  },
  priority: {
    type: String,
    required: true,
    enum: ['Critical', 'High', 'Medium', 'Low']
  },
  status: {
    type: String,
    required: true,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed', 'Reopened']
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  tab: { type: mongoose.Schema.Types.ObjectId, ref: 'Tab' }
}, {
  timestamps: true
});

// Composite index for unique serialNumber per user
bugSchema.index({ user: 1, serialNumber: 1 }, { unique: true });

const Bug = mongoose.model('Bug', bugSchema);

module.exports = Bug;
