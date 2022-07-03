var mongoose = require('mongoose');
var DayPlan = new mongoose.Schema({
    startshift: Number,
    startBreak: Number,
    endBreak: Number,
    endShift: Number,
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('dayPlan', DayPlan);