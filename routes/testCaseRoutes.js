const express = require('express');
const router = express.Router();
const testCaseController = require('../controllers/testCaseController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/create', testCaseController.createTestCase);
router.get('/all', testCaseController.getAllTestCases);
router.put('/update/:serialNumber', testCaseController.updateTestCase);
router.delete('/delete/:serialNumber', testCaseController.deleteTestCase);

module.exports = router;