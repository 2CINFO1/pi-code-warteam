var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Prime = new Schema({
    prime: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model('primes', Prime);