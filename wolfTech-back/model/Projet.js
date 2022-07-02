var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var Projet = new Schema (
{
Nom : String,
Description   : String,
Date_Debut : Date,
Date_Fin : Date,
Etat : String,
file : String
}




);
module.exports = mongoose.model('projets' , Projet)