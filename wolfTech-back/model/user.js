const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String },
    blocked: { type: Boolean, default: false },
    image: { type: String, default: null },
    role: {
        type: mongoose.Schema.ObjectId,
        ref: 'roles' //le nom de la collection dans la bade de donnes,
    },
    leave_balance: { type: Number, default: 0 },
    created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("user", userSchema);