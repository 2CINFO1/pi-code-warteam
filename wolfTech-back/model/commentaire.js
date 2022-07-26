var mongoose = require('mongoose');
const reponse = require('./reponse');
const user = require('./user');
var Schema = mongoose.Schema;
var Commentaire = new Schema({
    textC: { type: String },
    reponse: [{
        type: mongoose.Schema.ObjectId,
        ref: 'reponses',
        required: false
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    demande: {
        type: mongoose.Schema.ObjectId,
        ref: 'demandes'
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: false
    }],
}, { timestamps: true });

module.exports = mongoose.model("commentaires", Commentaire);