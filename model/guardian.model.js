const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GuardianSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    fatherName: {
        type: String
    },
    motherName: {
        type: String
    },
    mobileNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    createdAt: {
        type: String,
        default: Date.now()
    },
    updatedAt: {
        type: String,
        default: Date.now()
    }
})

module.exports = mongoose.model('Guardian', GuardianSchema);