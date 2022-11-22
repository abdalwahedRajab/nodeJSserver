const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')
 
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorControllers')
const userRoute=require('./route/userRoute')


const app = express();

app.use(cors({
    origin:'http://ja-vognmand.dk',
    credentials:true

})) 
app.options("*",cors())
app.use(express.json({limit:'10kb'}));
app.use(cookieParser())

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});

//route
app.use('/api/v1/users',userRoute);

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this Server`,404));
})

app.use(globalErrorHandler);

module.exports = app;
