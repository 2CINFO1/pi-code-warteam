const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  role: {
    type: mongoose.Schema.ObjectId,
    ref:'roles' //le nom de la collection dans la bade de donnes 
  },
  likes: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'likes' }
],
commentaire:{
  type: mongoose.Schema.ObjectId,
  ref: 'commentaires'
}

});

module.exports = mongoose.model("user", userSchema);