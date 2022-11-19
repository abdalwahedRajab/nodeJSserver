const express = require('express');
const authController = require('../controllers/authControllers')
const usersContrllers = require('../controllers/userController')
const {storage} = require('../cloudinary/index')

const router = express.Router();

const multer  = require('multer')
const upload = multer({storage})



router.get('/',usersContrllers.getUsers)
router.get('/logout',authController.logout)
router.post('/register',authController.signup)
router.post('/login',authController.login)
router.post('/:userid/cars',usersContrllers.addCar)
router.post('/:userid/drivers',upload.array('contract'),usersContrllers.addDriver)
router.patch('/:userid/driversSer',upload.array('certifications'),usersContrllers.addDriverSer)
router.get('/profile',authController.isLoggedIn,usersContrllers.userProfile)
router.get('/carProfile',authController.isLoggedInCars,usersContrllers.carProfile)
router.get('/driverProfile',authController.isLoggedInDriver,usersContrllers.driverProfile)
router.get('/findUser',usersContrllers.findUser)
router.post('/:userid/:carid/addExp',usersContrllers.addExp)
router.delete('/:userId',usersContrllers.deleteUser)
router.delete('/cars/:carId',usersContrllers.deleteCar)
router.delete('/drivers/:driverId',usersContrllers.deleteDriver)
router.patch('/:userid/:carid/updateExp',usersContrllers.updateExp)
router.patch('/:userId/updateUser',usersContrllers.updateUser)
router.get('/:carId/:m/:y/expProfile',usersContrllers.expProfile)
router.get('/allProfits',authController.isLoggedInExp)
router.get('/:userId/getUser',usersContrllers.getUser)
module.exports = router;