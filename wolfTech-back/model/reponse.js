var mongoose = require('mongoose');
const commentaire = require('./commentaire');
var Schema = mongoose.Schema;
 var Reponse = new Schema({
textR :  String,
created_at    : { type: Date, required: true, default: Date.now },
commentaire:{
    type: mongoose.Schema.ObjectId,
    ref: 'commentaires'
}
});

module.exports = mongoose.model('responses', Reponse);