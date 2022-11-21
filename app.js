const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const session = require('express-session')
 
const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorControllers')
const userRoute=require('./route/userRoute')


const app = express();

app.use(cors({
    origin  : ["http://ja-vognmand.dk","https://nodejs-server-iq5z.onrender.com"],
    credentials:true

})) 
app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: "sessionss",
      cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: "none",
        // httpOnly: false,
        secure: true,
      },
    })
  );

app.use(express.json({limit:'10kb'}));
app.use(cookieParser())

//route
app.use('/api/v1/users',res.setHeader('Content-Type', 'text/plain'),userRoute);

app.all('*',(req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this Server`,404));
})

app.use(globalErrorHandler);

module.exports = app;
