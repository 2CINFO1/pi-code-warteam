const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    
    commentaire:{
        type: mongoose.Schema.ObjectId,
        ref: 'commentaires'
    },

    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'user'        
    }
        
    
},
{timestamps:true},
) ;

module.exports = mongoose.model("reaction", schema);