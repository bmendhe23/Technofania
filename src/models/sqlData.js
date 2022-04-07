const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sqluser = new Schema({
    username:{
        type:String,  //205121103
        required:true,
        unique:true
    },
    score:{
        type:Number,  //4
        default:0
    },
    levels:[{
        levelNumber:Number, //1,2,3...
        progress:String,   // true/false
        query:String    // select username from tablename;
    }
    ],
    lastUpdated:[{
        type:Date
    }]

});


module.exports = mongoose.model('sqluser', sqluser);