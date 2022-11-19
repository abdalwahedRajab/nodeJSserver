const mongoose = require('mongoose');
const User = require('./users') 

const fileSchema= new mongoose.Schema({
    url:String,
    filename:String
})

const driverSchema = new mongoose.Schema({
    nameDriver:String,
    emailDriver:String,
    mobileDriver:String,
    contract:[fileSchema],
    certifications:[fileSchema],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }},
    { 
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }

)

module.exports = new mongoose.model('Driver',driverSchema);