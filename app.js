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
app.use(express.json({limit:'10kb'}));
app.use(cookieParser())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://ja-vognmand.dk');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//route
app.use('/api/v1/users',userRoute);

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this Server`,404));
})

app.use(globalErrorHandler);

module.exports = app;
