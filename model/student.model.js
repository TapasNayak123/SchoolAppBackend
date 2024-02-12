const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    avatar: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
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

module.exports = mongoose.model('Student', StudentSchema)