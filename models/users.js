const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'provide a user name']
    },
    navn:{
        type:String
    },
    firmaNavn:{
        type:String
    },
    direkteTelefon:{
        type:String
    },
    mobil:{
        type:String
    },
    role:{
        type:String,
        default:'user'
    },
    email:{
        type:String,
        required:[true,'provide a email'],
        unique:true,
        validate:[validator.isEmail,'please provide a vaild email']
    },
    password:{
        type:String,
        required:[true,'provide a password'],
        select:false
    },
    position:{
        type:String
    }
    },
    { 
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    });

userSchema.virtual('cars',{
    ref:'Car',
    foreignField:'user',    
    localField:'_id'
})

userSchema.virtual('drivers',{
    ref:'Driver',
    foreignField:'user',    
    localField:'_id'
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password,12)

    next();
})

userSchema.methods.coorectPassword = async function(currentPassword,userPassword){
    return await bcrypt.compare(currentPassword,userPassword)
}

module.exports =mongoose.model('User',userSchema);

