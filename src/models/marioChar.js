const mongoose = require('mongoose');

//  Your code goes here
const marioModel = mongoose.model("mariochar",new mongoose.Schema({
    name:String,
    weight:Number,
}))


module.exports = marioModel;
