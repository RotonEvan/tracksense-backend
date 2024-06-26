const mongoose = require('mongoose');

const expense = new mongoose.Schema({
    cost: {
        type: Number,
        required: [true, 'The amount field is required!'],
        trim: true
    },
    date: {
        type: Date,
        required: [true, 'The timestamp field is required!'],
        trim: true
    },
    desc: {
        type: String,
        required: [true, 'The type field is required!'],
        trim: true
    },
    tag: {
        type: String,
        required: [true, 'The tag field is required!'],
        trim: true
    }
}, { minimize: false });

module.exports = Expense = mongoose.model('expense', expense);