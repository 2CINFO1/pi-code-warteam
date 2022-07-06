var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var Tache = new Schema (
{
Nom : String,
Description   : String,
Date_Debut : Date,
Date_Fin : Date,
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