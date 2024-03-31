const mongoose = require('mongoose');

const GlanceSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    daily: {
        type: Number,
        required: true
    },
    weekly: {
        type: Number,
        required: true
    },
    monthly: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Glance', GlanceSchema);