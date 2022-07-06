var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var Projet = new Schema (
{
Nom : String,
Description   : String,
Date_Debut : Date,
Date_Fin : Date,
Etat : String,
file : String,
Taches:[{
    type: mongoose.Schema.ObjectId,
    ref: 'taches',
    required: false
}],
isArchive : {type : Boolean,default : false},
created_at: { type: Date, required: true, default: Date.now }
}




);
module.exports = mongoose.model('projets' , Projet)