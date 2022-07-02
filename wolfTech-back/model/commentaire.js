var mongoose = require('mongoose');
const reponse = require('./reponse');
var Schema = mongoose.Schema;
 var Commentaire = new Schema({
textC :  String,
created_at    : { type: Date, required: true, default: Date.now },
reponse:{
    type: mongoose.Schema.ObjectId,
    ref: 'reponses',
    required: false
}
});

   
module.exports = mongoose.model('commentaires', Commentaire);