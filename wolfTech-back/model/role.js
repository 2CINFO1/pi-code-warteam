const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: { type: String, default: null },
  created_at: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model("roles", roleSchema);