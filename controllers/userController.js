const User = require('../models/users');
const catchAsync = require('../utils/catchAsync');
const Car = require('../models/cars');
const Driver = require('../models/drivers');
const Expens = require('../models/expenses');
const bcrypt = require('bcryptjs')

exports.getUsers = catchAsync(async(req,res,next)=>{
    const users = await User.find({})

    res.status(200).json({
        status:'success',
        result:users.length,
        data:{
            users
        }
    })
})


exports.userProfile = catchAsync(async(req,res,next)=>{
    const currentUser = await res.locals.currentUser
    res.status(200).json({
        status:'success',
        data:{
            currentUser
        }
            })
        })

exports.addCar = catchAsync(async(req,res,next)=>{  
    if(!req.body.user) req.body.user = req.params.userid
    const newCar = await Car.create(req.body)
        res.status(200).json({
            status:'success',
            data:{
                car:newCar
            }
        })
})

exports.addDriver = catchAsync(async(req,res,next)=>{
    if(!req.body.user) req.body.user = req.params.userid
    const driver = new Driver(req.body);
    driver.contract = req.files.map(f=>({url:f.path, filename:f.filename}))
    await driver.save();
        res.status(200).json({
            status:'success',
            data:{
                driver
            }
        })
})

exports.addDriverSer = catchAsync(async(req,res,next)=>{
    if(!req.body.user) req.body.user = req.params.userid
    const certificationsNew=req.files.map(f=>({url:f.path,filename:f.filename}))
    const driver = await Driver.findOneAndUpdate({user:req.params.userid,nameDriver:req.body.nameDriver},
    {
        new:true,
        runValidators:true
    })
    driver.certifications.push(...certificationsNew)
    await driver.save();
        res.status(200).json({
            status:'success',
            data:{
                driver
            }
        })
})

exports.carProfile=catchAsync(async(req,res,next)=>{
    const currentCar = await res.locals.currentCar
    res.status(200).json({
        status:'success',
        data:{
            currentCar
        }
            })
        })
exports.driverProfile=catchAsync(async(req,res,next)=>{
    const currentDriver = await res.locals.currentDriver
    res.status(200).json({
        status:'success',
        data:{
            currentDriver
        }
            })
        })

exports.findUser=catchAsync(async(req,res,next)=>{

    const u = await User.findOne({userName:req.body.userName})
    res.json({
        status:"success",
        data:{
            u
        }
    })
        })

exports.addExp= catchAsync(async(req,res,next)=>{
    if(!req.body.user) req.body.user = req.params.userid
    if(!req.body.car) req.body.car = req.params.carid
    const newExp = await Expens.create(req.body)
    res.status(200).json({
        status:'success',
        data:{
            exp:newExp
        }
    })
})
exports.expProfile=catchAsync(async(req,res,next)=>{
    const currentCar = await Car.findById(req.params.carId).populate('expensess')
    const currentExp = await Expens.findOne({months:req.params.m,years:req.params.y})
    res.status(200).json({
        status:'success',
        data:{
            currentExp
        }
            })
        })
exports.updateExp =catchAsync(async(req,res,next)=>{
    const newExp = await Expens.findOneAndUpdate({car:req.params.carid},req.body,{
        new:true,
        runValidators:true
    })
    res.status(200).json({
        status:'success',
        data:{
            exp:newExp
        }
    })
})

exports.deleteUser = catchAsync(async(req,res,next)=>{
    const delUser = await User.findByIdAndDelete(req.params.userId)
    res.status(200).json({
        status:'success'
    })
})

exports.deleteCar = catchAsync(async(req,res,next)=>{
    const delCar = await Car.findByIdAndDelete(req.params.carId)
    res.status(200).json({
        status:'success'
    })
})

exports.deleteDriver = catchAsync(async(req,res,next)=>{
    const delCar = await Driver.findByIdAndDelete(req.params.driverId)
    res.status(200).json({
        status:'success'
    })
})

exports.updateUser = catchAsync(async(req,res,next)=>{
    const updateUser = await User.findByIdAndUpdate(req.params.userId,req.body,{
        new:true,
        runValidators:true
    })
    updateUser.password=await bcrypt.hash(req.body.password,12)
    updateUser.save()
    res.status(200).json({
        status:'success'
    })
})

exports.getUser = catchAsync(async(req,res,next)=>{
    const user = await User.findById(req.params.userId)
    res.status(200).json({
        status:'success',
        data:{
            user
        }
    })
})