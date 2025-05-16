const Bug = require('../models/Bug');
const AutoIncrement = require('../utils/autoIncrement');

// Create Bug
exports.createBug = async (req, res) => {
  try {
    const { companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ success: false, message: 'Company ID is required' });
    }

    const serialNumber = await AutoIncrement(req.user._id.toString(), companyId); // Update autoIncrement logic if needed

    const bug = new Bug({
      user: req.user._id.toString(),
      company: companyId,
      serialNumber,
      bugModule: req.body.bugModule,
      bugType: req.body.bugType,
      bugDescription: req.body.bugDescription,
      requirement: req.body.requirement,
      severity: req.body.severity,
      priority: req.body.priority,
      status: req.body.status
    });

    await bug.save();

    res.status(201).json({
      success: true,
      message: 'Bug created successfully',
      bug
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get All Bugs of Logged-in User for a Company
exports.getAllBugs = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({ success: false, message: 'Company ID is required' });
    }

    const bugs = await Bug.find({ user: userId, company: companyId }).sort({ serialNumber: 1 }).lean();

    res.status(200).json({
      success: true,
      count: bugs.length,
      bugs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Update Bug by serialNumber (scoped to user & company)
exports.updateBug = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { companyId } = req.body;

    if (!companyId) {
      return res.status(400).json({ success: false, message: 'Company ID is required' });
    }

    const bug = await Bug.findOneAndUpdate(
      { user: userId, company: companyId, serialNumber: req.params.serialNumber },
      req.body,
      { new: true }
    );

    if (!bug) {
      return res.status(404).json({
        success: false,
        message: 'Bug not found or not authorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bug updated successfully',
      bug
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Delete Bug by serialNumber (scoped to user & company)
exports.deleteBug = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({ success: false, message: 'Company ID is required' });
    }

    const bug = await Bug.findOneAndDelete({
      user: userId,
      company: companyId,
      serialNumber: req.params.serialNumber
    });

    if (!bug) {
      return res.status(404).json({
        success: false,
        message: 'Bug not found or not authorized'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Bug deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// Get Filtered Bugs for Logged-in User and Company
exports.getFilteredBugs = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({ success: false, message: 'Company ID is required' });
    }

    const {
      bugType,
      severity,
      priority,
      status,
      search
    } = req.query;

    const query = {
      user: userId,
      company: companyId
    };

    if (bugType) query.bugType = { $in: Array.isArray(bugType) ? bugType : [bugType] };
    if (severity) query.severity = { $in: Array.isArray(severity) ? severity : [severity] };
    if (priority) query.priority = { $in: Array.isArray(priority) ? priority : [priority] };
    if (status) query.status = { $in: Array.isArray(status) ? status : [status] };

    if (search) {
      query.$or = [
        { bugDescription: { $regex: search, $options: 'i' } },
        { requirement: { $regex: search, $options: 'i' } },
        { bugModule: { $regex: search, $options: 'i' } }
      ];
    }

    const bugs = await Bug.find(query).sort({ createdAt: -1 }).lean();

    res.status(200).json({
      success: true,
      count: bugs.length,
      bugs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching bugs',
      error: error.message
    });
  }
};
