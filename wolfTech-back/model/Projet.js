var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var Projet = new Schema (
{
Nom : String,
Description   : String,
Date_Debut :  { type: Date, required: false },
Date_Fin :  { type: Date, required: false },
Etat : String,
file : String
}



);
module.exports = mongoose.model('projets' , Projet)