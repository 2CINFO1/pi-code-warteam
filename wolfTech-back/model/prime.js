var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Prime = new Schema({
    prime: Number,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user' //le nom de la collection dans la bade de donnes 
    },
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('prime', Prime);