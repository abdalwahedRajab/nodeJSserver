const mongoose = require('mongoose');
const User = require('./users')

const carSchema = new mongoose.Schema({
    model:String,
    dateOfManfacture:String,
    driverOfCar:String,
    PlateNumber:String,
    registrationNumber:String,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }

},
{ 
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

carSchema.virtual('expensess',{
    ref:'Expens',
    foreignField:'car',    
    localField:'_id'
})

carSchema.pre(/^find/,function(next){
    this.populate({
    path:'expensess',
    select:'-bilOgDiesel -bilGrønAfgift -bilService -bilUdstyr -diesel -billeasing -bilForsikring -ansvarsForsikring -arbejdsskade -sygpenge -mæglerhonorar -mobiltelefon -mobileSimline -vognløbUdleje -vognløbePortal -korrektion -r2pObdBox -r2p -løn -kaOverenkostTællig -feriePenge -lønsum -atp -arbejdestøj -rengøringMaterialer -førstehjælpKursus -amuJuulDekraKursus -ovrigAndet -tilladelse -revisor -tilladelseAndet' 
})
    

    next()
})



module.exports =mongoose.model('Car',carSchema);