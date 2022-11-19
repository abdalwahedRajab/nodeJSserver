const {promisify} = require('util');
const User = require('../models/users');
const Car = require('../models/cars');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError');
const Expenses = require('../models/expenses');

const signToken = id => {
    return jwt.sign({id},process.env.JWT_SECRET,{
       expiresIn:process.env.JWT_EXPIRE_IN})
   }

const creatSendToken = (user,statusCode,res)=>{
    const token = signToken(user._id)
    const cookieOptions = {
        expires:new Date(Date.now()+ process.env.JWT_COKIE_EXPIRES_IN * 24 *60 *60 *1000),
        httpOnly: true    }
    if (process.env.NODE_ENV==='production') cookieOptions.secure = true;

    res.cookie('jwt',token,cookieOptions)

    res.status(statusCode).json({
        status:'success',
        token
    })
}
exports.signup=catchAsync (async(req,res,next)=>{
    const newUser = await User.create({
     userName: req.body.userName,
     position:req.body.position,
     navn: req.body.navn,
     firmaNavn: req.body.firmaNavn,
     direkteTelefon :req.body.direkteTelefon,
     mobil: req.body.mobil,
     email : req.body.email,
     password: req.body.password,
     role:req.body.role
    })
    res.status(200).json({
        status:'success'
    })
})

exports.login = catchAsync(async(req,res,next)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email}).select('+password')

    if(!user || !await user.coorectPassword(password,user.password))
    return next(new AppError('Inccorect email or password',401))

    const token = signToken(user._id)
    creatSendToken(user,200,res)
})

exports.logout = catchAsync(async(req,res,next)=>{
    res.cookie('jwt','loogedout',{
        expires:new Date ( Date.now() + 1 * 1000),
        httpOnly:true
    })
    res.status(200).json({
        status:'success'
    })
})

exports.isLoggedIn = catchAsync (async (req,res,next)=>{
    if (req.cookies.jwt){      
    const decoded=await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET)
    
    const currentUser = await User.findById(decoded.id).select('-cars')
        res.locals.currentUser = currentUser
     return next();
    }else{
     return next(new AppError('you must be loged in ',401))
    }
})

exports.isLoggedInCars = catchAsync (async (req,res,next)=>{
    if (req.cookies.jwt){      
    const decoded=await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET)
    
    const currentCar = await User.findById(decoded.id).populate('cars').select(
        '-email -userName -navn -firmaNavn -mobil -direkteTelefon -role')
        res.locals.currentCar = currentCar
     return next();
    }else{
     return next(new AppError('you must be loged in ',401))
    }
})

exports.isLoggedInDriver = catchAsync (async (req,res,next)=>{
    if (req.cookies.jwt){      
    const decoded=await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET)
    
    const currentDriver = await User.findById(decoded.id).populate('drivers').select(
        '-email -userName -navn -firmaNavn -mobil -direkteTelefon -role -cars')
        res.locals.currentDriver = currentDriver
     return next();
    }else{
     return next(new AppError('you must be loged in ',401))
    }
})

exports.isLoggedInExp = catchAsync (async (req,res,next)=>{
    if (req.cookies.jwt){      
    const decoded=await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET)
    
        const currentCar = await Car.find({user:decoded.id}).populate('expensess').select(
            '-model -dateOfManfacture -driverOfCar -registrationNumber -user') 

         res.status(200).json({
            status:'success',
                data:{
                    currentCar
                }
                    })
         
    }else{
     return next(new AppError('you must be loged in ',401))
    }
})