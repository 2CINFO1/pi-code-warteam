var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var Tache = new Schema (
{
Nom : String,
Description   : String,
Date_Debut : Date,
Date_Fin : Date,
Etat : String,
Projet:{
    type: mongoose.Schema.ObjectId,
    ref: 'projets'
},
User:{
    type: mongoose.Schema.ObjectId,
    ref: 'users'
}

}



);
module.exports = mongoose.model('taches' , Tache)