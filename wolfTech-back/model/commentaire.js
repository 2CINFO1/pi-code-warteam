var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 

var Commentaire = new Schema({
textC :  String,
created_at    : { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('commentaires', Commentaire);