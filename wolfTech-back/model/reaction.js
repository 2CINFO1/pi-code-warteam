const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    
    type  : {type : String , default:"like"},
    commentaire:{
        type: mongoose.Schema.ObjectId,
        ref: 'commentaires'
    },

    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'users'
        
    },
    
        
    
},
{timestamps:true},
) ;

module.exports = mongoose.model("reaction", schema);