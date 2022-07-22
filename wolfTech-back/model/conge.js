var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Conge = new mongoose.Schema({
    leave_subject: {
        type: String,
        required: "subject cant be blank",
        enum: ["Sick Leave", "Casual Leave", "Maternity Leave", "Religious Holiday", "Public Holiday"],
        default: "Casual Leave"
    },
    leave_reason: String,
    start_date: Date,
    end_date: Date,
    days: Number,
    status: {
        type: String,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model("conges", Conge);