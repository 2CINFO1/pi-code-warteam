const mongoose = require("mongoose");

const Review = new mongoose.Schema({
    description: { type: String, default: null },
    rate: { type: Number, default: null },
    projet: {
        type: mongoose.Schema.ObjectId,
        ref: 'projets'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user'
    },
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("reviews", Review);