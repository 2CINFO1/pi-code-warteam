const mongoose = require("mongoose");

const Demande = new mongoose.Schema({
    title: { type: String, default: null },
    description: { type: String, default: null },
    file: { type: String, default: null },
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("demandes", Demande);