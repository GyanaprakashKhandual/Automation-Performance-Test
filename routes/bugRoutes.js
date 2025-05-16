const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bugController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes protected
router.use(authMiddleware);

router.post('/create', bugController.createBug);
router.get('/all', bugController.getAllBugs);
router.put('/update/:serialNumber', bugController.updateBug);
router.delete('/delete/:serialNumber', bugController.deleteBug);
router.get('/bugs', bugController.getFilteredBugs);

module.exports = router;
