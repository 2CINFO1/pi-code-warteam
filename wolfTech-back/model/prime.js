var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Prime = new Schema({
    prime: Number,
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('prime', Prime);