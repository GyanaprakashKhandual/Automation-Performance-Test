const TestCase = require('../models/TestCase');
const AutoIncrement = require('../utils/autoIncrement');

exports.createTestCase = async (req, res) => {
    try {
        const serialNumber = await AutoIncrement(req.user.id);

        const testCase = new TestCase({
            user: req.user.id,
            serialNumber,
            testCaseModule: req.body.testCaseModule,
            testCaseType: req.body.testCaseType,
            testCaseDescription: req.body.testCaseDescription,
            acctualResult: req.body.acctualResult,
            expectedResult: req.body.expectedResult,
            status: req.body.status
        });

        await testCase.save();
        res.status(201).json({
            success: true,
            message: 'Test Case created successfully',
            testCase
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.getAllTestCases = async (req, res) => {
    try{
        const testCases = await TestCase.find({ user: req.user.id }).sort({ serialNumber: 1 });
        res.json(testCases);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.updateTestCase = async (req, res) => {
    try {
        const testCase = await TestCase.findOneAndUpdate({
            user: req.user.id,
            serialNumber: req.params.serialNumber
        }, req.body, { new: true });

        if (!testCase) {
            return res.status(404).json({
                success: false,
                message: 'Test Case not found'
            });
        }

        res.json({
            success: true,
            message: 'Test Case updated successfully',
            testCase
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.deleteTestCase = async (req, res) => {
    try {
        const testCase = await TestCase.findOneAndDelete({
            user: req.user.id,
            serialNumber: req.params.serialNumber
        });

        if (!testCase) {
            return res.status(404).json({
                success: false,
                message: 'Test Case not found'
            });
        }

        res.json({
            success: true,
            message: 'Test Case deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}