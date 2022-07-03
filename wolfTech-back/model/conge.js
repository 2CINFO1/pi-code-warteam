var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Conge = new Schema({
    startdate: Date,
    enddate: Date,
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('conges', Conge);
/*
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Conge = new mongoose.Schema({
    subject: { type: String, required: "subject cant be blank" },
    from: Date,
    to: Date,
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
    stud: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        },
        username: String
    }
}, { timestamps: {} });

module.exports = mongoose.model("conges", Conge);
*/