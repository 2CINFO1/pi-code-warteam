/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Conge = new Schema({
    startdate: Date,
    enddate: Date,
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user' //le nom de la collection dans la bade de donnes 
    },
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('conges', Conge);
*/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Conge = new mongoose.Schema({
    leave_subject: {
        type: String,
        required: "subject cant be blank",
        enum: ["Sick leave", "Casual leave", "Public holiday", "Religious holidays", "Maternity leave"],
        default: "Casual Leave"
    },
    start_date: Date,
    end_date: Date,
    days: Number,
    status: {
        type: String,
        enum: ["pending", "approved", "denied"],
        default: "pending"
    },

    approved: {
        type: Boolean,
        default: false
    },
    denied: {
        type: Boolean,
        default: false
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        first_name: String,
        last_name: String
    }
});

module.exports = mongoose.model("conges", Conge);