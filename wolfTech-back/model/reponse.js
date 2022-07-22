var mongoose = require('mongoose');
const commentaire = require('./commentaire');
var Schema = mongoose.Schema;
 var Reponse = new Schema({
textR :  String,
created_at    : { type: Date, required: true, default: Date.now },
commentaire:{
    type: mongoose.Schema.ObjectId,
    ref: 'commentaires'
},
user:{
    type: mongoose.Schema.ObjectId,
    ref: 'user'
},
likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'likes' }
]
});

module.exports = mongoose.model('responses', Reponse);