var mongoose = require('mongoose');
const reponse = require('./reponse');
const user = require('./user');
var Schema = mongoose.Schema;
 var Commentaire = new Schema({
textC : { type: String },
reponse:[{
    type: mongoose.Schema.ObjectId,
    ref: 'reponses',
    required: false
}],
user:{
    type: mongoose.Schema.ObjectId,
    ref: 'users'
},

 },
 { timestamps: true }
);

   
module.exports = mongoose.model('commentaires', Commentaire);