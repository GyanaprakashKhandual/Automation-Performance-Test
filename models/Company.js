const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;