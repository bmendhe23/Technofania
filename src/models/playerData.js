const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    projectedScore:{
        type:Number,
        default:0
    },
    realScore:{
        type:Number,
        default:0
    },
    lastUpdated:{
        type:Date
    }
    
});


module.exports = mongoose.model('Player', Player);