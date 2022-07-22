var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var Tache = new Schema (
{
Nom : String,
Description   : String,
Date_Debut : {type: Date, required: false},
Date_Fin : {type: Date, required: false},
Etat : {type: String, required: true, default: 'En cours' },
User:{
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: false
},
created_at: { type: Date, required: true, default: Date.now }

}



);
module.exports = mongoose.model('taches' , Tache)