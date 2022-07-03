const mongoose = require("mongoose");

const Review = new mongoose.Schema({
    description: { type: String, default: null },
    file: { type: String, default: null },
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("reviews", Review);