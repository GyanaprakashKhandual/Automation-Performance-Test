// routes/companyRoutes.js
const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

router.post('/add/companies', async (req, res) => {
  try {
    const { name } = req.body;

    // Prevent duplicates
    const existing = await Company.findOne({ name });
    if (existing) return res.status(400).json({ error: 'Company already exists' });

    const company = new Company({ name });
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all/companies', async (req, res) => {
  const companies = await Company.find({});
  res.json(companies);
});

module.exports = router;
