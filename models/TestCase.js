const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    serialNumber: { 
        type: Number, 
        required: true 
    },
    testCaseModule: {
        type: String,
        required: true
    },
    testCaseType: {
        type: String,
        required: true
    },
    testCaseDescription: {
        type: String,
        required: true,
    },
    acctualResult: {
        type: String,
        required: true
    },
    expectedResult: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Pass', 'Failed', 'Partially Paased', 'Not Executed', 'Blocked']
    },
    }, {
    timestamps: true
});

const TestCase = mongoose.model('TestCase', testCaseSchema);
module.exports = TestCase;