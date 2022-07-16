const mongoose = require("mongoose");

const Demande = new mongoose.Schema({
    title: { type: String, default: null },
    description: { type: String, default: null },
    file: { type: String, default: null },
    status: { type: String, required: false },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("demandes", Demande);