var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 

var Reponse = new Schema({
textR :  String,
created_at    : { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('responses', Reponse);