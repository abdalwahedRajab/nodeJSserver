const dotenv= require('dotenv').config()
const mongoose=require('mongoose')
const http = require('http')

mongoose.connect(`mongodb+srv://abdalrahman:${process.env.dataPass}@cluster0.uogerge.mongodb.net/?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
}); 
const app =require('./app')

const server = http.createServer(app)
const address = "0.0.0.0"
server.listen(process.env.PORT,address,()=>{
    console.log("alsjd;ad;la;sdl")
    console.log('App Running On Port 3000')
    console.log(server.address())
})
