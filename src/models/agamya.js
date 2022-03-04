const mongoose = require('mongoose');

const aagamyaSchema = mongoose.Schema({
    teamname: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    member1Name: {
        type: String,
        required: true,
        trim: true
    },
    member1Roll: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    member2Name: {
        type: String,
        required: true,
        trim: true
    },
    member2Roll: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    member3Name: {
        type: String,
        required: true,
        trim: true
    },
    member3Roll: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    member4Name: {
        type: String,
        trim: true
    },
    member4Roll: {
        type: String,
        trim: true
    },
    member5Name: {
        type: String,
        trim: true
    },
    member5Roll: {
        type: String,
        trim: true
    }
});

const Agamya = mongoose.model("Agamya", aagamyaSchema);

module.exports = Agamya;